import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
import useToken from '../components/useToken';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { AppSearch } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'mssv', label: 'MSSV', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'present', label: 'Present', alignRight: false },
  { id: 'absence', label: 'Absence', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

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

export default function ResultPage() {

  const { token } = useToken()

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

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - listStudents.length);

  const filteredUsers = applySortFilter(listStudents, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const refreshPage = (list) => {
    if (list && list.length > 0) {
      setListStudents(list)
      setPage(0)
      setRowsPerPage(5)
    }
  }
  
  const [errorMsg, seterrorMsg] = useState('');
  const [open, setOpen] = useState(false);

  const showMessage = (msg) => {
    seterrorMsg(msg)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (token.account.role === 'teacher')
  {
    return (
      <>
        <Helmet>
          <title> Result of Attandance | Minimal UI </title>
        </Helmet>
  
        <Container>
          <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
            Result of Attandance
          </Typography>
  
          <AppSearch setListStudents={setListStudents} refreshPage={refreshPage} showMessage={showMessage}/> 
          
          <Card>
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
  
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { mssv, name, present, absence, status } = row;
  
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
  
                          <TableCell align="left">{present}</TableCell>    
                          <TableCell align="left">{absence}</TableCell>    
  
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
            <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
              {errorMsg}
            </Alert>
          </Snackbar>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title> Result of Attandance | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
          Result of Attandance
        </Typography>

        <AppSearch setListStudents={setListStudents} refreshPage={refreshPage} showMessage={showMessage}/> 
        
        <Card>
          Student
        </Card>
      </Container>

      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        </Snackbar>
    </>
  );
}
