import { useState } from 'react'
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { 
  Container,
  Grid, Alert,
  Typography,
  Box, Button, 
  Card, CardHeader, 
  TableContainer, 
  Table, TableBody,
  TableRow, TableCell,
  Snackbar, Checkbox,
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle
} from '@mui/material';
// sections
import { AppSearchAttend } from '../sections/@dashboard/app';
// component
import Scrollbar from '../components/scrollbar';

// ----------------------------------------------------------------------

export default function AttendancePage() {

    const [camera, setCamera] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [currentCode, setCurentCode] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [selected, setSelected] = useState([]);

    const [openMessage, setOpenMessage] = useState(false);
    const handleCloseMessage = () => {
      setOpenMessage(false);
    };

    const showMessage = (msg) => {
      seterrorMsg(msg)
      setOpenMessage(true);
    };

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleClickOpenConfirm = () => {
      setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    const handleClick = (mssv) => {
      const selectedIndex = selected.indexOf(mssv);
      let newSelected = [];
      console.log(selectedIndex)
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, mssv);
        const newList = itemsList.map((item) => {
          if (item.mssv === mssv) {
            const updatedItem = {
              ...item,
              datesession: new Date().toLocaleDateString('en-GB'),
            };
    
            return updatedItem;
          }
    
          return item;
        });
    
        setItemsList(newList);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      
      setSelected(newSelected);

      if (selectedIndex > -1) {
        newSelected = newSelected.concat(selected, mssv);
        const newList = itemsList.map((item) => {
          if (item.mssv === mssv) {
            const updatedItem = {
              ...item,
              datesession: null,
            };
    
            return updatedItem;
          }
    
          return item;
        });
    
        setItemsList(newList);
      }
    };

    const StyledProductImg = styled('img')({
      top: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    });

    const Attend = () => {
      if (currentCode) {
        fetch(`/diemdanh/${currentCode}`).then((res) =>
          res.json().then((result) => {
            if (result.success === true)
            {
              seterrorMsg('')
              const studentID = result.data
              if (!selected.some(s => s === studentID))
                handleClick(studentID)
              else
                showMessage(`Student ${studentID} attended.`)
            }
            else
              showMessage(result.msg)
          })
        );
      }
    }

    const handleSubmitAttend = () => {
      console.log(itemsList)
      const jsonParam = {
        "classID": currentCode,
        "listStudents": itemsList
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonParam)
      }
      fetch(`/submitAttended`,requestOptions).then((res) =>
          res.json().then((result) => {
            if (result.success === true)
            {
              setOpenConfirm(false)
            }
            else
            {
              showMessage(result.msg)
              setOpenConfirm(false)
            }
          })
        );
    }

    const refreshPage = (list) => {
      if (list && list.length > 0) {
        setItemsList(list)
        let listAttend = []
        listAttend = list.map(item => {
          if (item.datesession)
            return item.mssv
          return null
        })
        setSelected(listAttend)
      }
    }

    return (
      <>
        <Helmet>
          <title> Attendance | Minimal UI </title>
        </Helmet>
        
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Attendance
          </Typography>
          <AppSearchAttend setCurentCode={setCurentCode} refreshPage={refreshPage} showMessage={showMessage}/> 
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <Box sx={{ p: 1 }} dir="ltr">
                    <StyledProductImg alt='camera-on' src={camera ? 'http://localhost:5000/video' :`/assets/images/camera-notload.jpeg` }/>
                </Box>

                <Box sx={{ m: 2, mt: 1, textAlign: 'center'}} dir="ltr">
                  <Button disabled={currentCode === ''} variant="contained" sx={{ mr: 2}} onClick={() => setCamera(!camera)}>On/Off</Button>
                  <Button disabled={currentCode === ''} variant="contained" onClick={Attend}>Attendance</Button>
                </Box>
              </Card>
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <Card >
                <CardHeader title={
                  <Typography noWrap variant="h6" component="h4">
                    List Students Attended
                  </Typography>
                }/>
                <Scrollbar sx={{ minHeight: 380, maxHeight: 380}}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {
                          itemsList.map((item, index) => {
                            const { mssv, name, datesession } = item;
                            const selectedUser = selected.indexOf(mssv) !== -1;
                            return (
                              <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                <TableCell component="th" scope="row">
                                  <Typography variant="subtitle2" noWrap>
                                    {mssv} - {name}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">{datesession}</TableCell>    

                                <TableCell padding="checkbox">
                                  <Checkbox checked={selectedUser} onChange={() => handleClick( mssv)} />
                                </TableCell>
                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                
                <Button disabled={itemsList.length === 0} sx={{ m: 2 }} variant="contained" onClick={handleClickOpenConfirm}>Submit</Button>
                
              </Card>
            </Grid>

          </Grid>
        </Container>

        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Submit"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure submit this list students attended?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button onClick={handleSubmitAttend} autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openMessage} autoHideDuration={5000} onClose={handleCloseMessage}>
          <Alert onClose={handleCloseMessage} variant="filled" severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }
  