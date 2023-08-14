import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Card, 
  Table, 
  Stack, Snackbar,
  Paper, Alert,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../../components/label';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../user';
import { AppSearch } from '../app';

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

ResultTeacher.propTypes = {
    token:  PropTypes.object
};

export default function ResultTeacher({ token }) {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('mssv');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const [listStudents, setListStudents] = useState([]);
  const [headerTable, setHeaderTable] = useState([
    { id: 'mssv', label: 'MSSV', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'session1', label: 'Session 1', alignRight: false },
    { id: 'session2', label: 'Session 2', alignRight: false },
    { id: 'session3', label: 'Session 3', alignRight: false },
    { id: 'session4', label: 'Session 4', alignRight: false },
    { id: 'session5', label: 'Session 5', alignRight: false },
    { id: 'session6', label: 'Session 6', alignRight: false },
    { id: 'session7', label: 'Session 7', alignRight: false },
    { id: 'session8', label: 'Session 8', alignRight: false },
    { id: 'session9', label: 'Session 9', alignRight: false },
    { id: 'session10', label: 'Session 10', alignRight: false },
    { id: 'session11', label: 'Session 11', alignRight: false },
    { id: 'session12', label: 'Session 12', alignRight: false },
    { id: 'session13', label: 'Session 13', alignRight: false },
    { id: 'session14', label: 'Session 14', alignRight: false },
    { id: 'session15', label: 'Session 15', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
  ]);
  const [totalSessions, setSessions] = useState(15)

  const filteredUsers = applySortFilter(listStudents, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const emptyRows = !isNotFound ? Math.max(0, (1 + page) * rowsPerPage - listStudents.length) : 0;

  const refreshPage = (sessions, list) => {
    if (list && list.length > 0) {
      const headerName = [{ id: 'mssv', label: 'MSSV', alignRight: false }, { id: 'name', label: 'Name', alignRight: false }]
      const listSession = [...Array(sessions)].map((_, index) => {
        const currentIndex = index + 1
        return {id: `session${currentIndex}`, label: `Session ${currentIndex}`, alignRight: false}
      })
      const updateHeader = [...headerName, ...listSession].concat({id: 'status', label: 'Status', alignRight: false})
      setHeaderTable(updateHeader)
      setSessions(sessions)
      setListStudents(list)
      setPage(0)
      setRowsPerPage(5)
    }
  }
  
  const [message, setMessage] = useState({
    Success: true,
    Content: ""
  });
  const [open, setOpen] = useState(false);

  const showMessage = (isSuccess, msg) => {
    setMessage({
      Success: isSuccess,
      Content: msg
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Result of Attandance | TDTU </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
          Result of Attandance
        </Typography>

        <AppSearch token={token} refreshPage={refreshPage} showMessage={showMessage}/> 
        
        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={headerTable}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { mssv, name, sessions, status } = row;

                    return (
                      <TableRow hover key={mssv} tabIndex={-1}>

                        <TableCell align="left">{mssv}</TableCell>                        

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {
                          totalSessions && [...Array(totalSessions)].map((_, index) => <TableCell key={index} align="center">{sessions[index]}</TableCell>)
                        }

                        <TableCell align="left">
                          <Label color={(status === 'Ban' && 'error') || (status=== 'Warning' && 'warning') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination sx={{alignItems: 'center'}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={message.Success ? "success" : "error"} sx={{ width: '100%' }}>
          {message.Content}
        </Alert>
      </Snackbar>
    </>
  );
}