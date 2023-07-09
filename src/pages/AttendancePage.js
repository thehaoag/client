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
  Snackbar, Checkbox } from '@mui/material';
// sections
import { AppSearch } from '../sections/@dashboard/app';
// component
import Scrollbar from '../components/scrollbar';

// ----------------------------------------------------------------------

export default function AttendancePage() {

    const [camera, setCamera] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [currentCode, setCurentCode] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [currentDate] = useState(new Date().toLocaleDateString())
    const [selected, setSelected] = useState([]);

    const handleClick = (mssv) => {
      const selectedIndex = selected.indexOf(mssv);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, mssv);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    };

    const showMessage = (msg) => {
      seterrorMsg(msg)
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const StyledProductImg = styled('img')({
      top: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    });

    const Attend = () => {
      console.log(itemsList)
      if (currentCode) {
        fetch(`/diemdanh/${currentCode}`).then((res) =>
          res.json().then((data) => {
            if (data.success === true)
            {
              seterrorMsg('')
              const student = data.data
              if (!selected.some(s => s === student.mssv))
                handleClick(student.mssv)
              else
              {
                showMessage(`Student ${student.name} attended.`)
              }
                
            }
            else
            {
              showMessage(data.msg)
            }

          })
        );
      }
    }

    const handleSubmitAttend = () => {}

    const refreshPage = (list) => {
      if (list && list.length > 0) {
        setItemsList(list)
        setSelected([])
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
          <AppSearch setCurentCode={setCurentCode} refreshPage={refreshPage} showMessage={showMessage}/> 
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
                    List Attended - {currentDate}
                  </Typography>
                }/>
                <Scrollbar sx={{ minHeight: 380, maxHeight: 380}}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {
                          itemsList.map((item, index) => {
                            const { mssv, name, date } = item;
                            const selectedUser = selected.indexOf(mssv) !== -1;

                            return (
                              <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                <TableCell component="th" scope="row">
                                  <Typography variant="subtitle2" noWrap>
                                    {mssv} - {name}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">{date}</TableCell>    

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
                
                <Button disabled={itemsList.length === 0} sx={{ m: 2 }} variant="contained" onClick={handleSubmitAttend}>Submit</Button>
                
              </Card>
            </Grid>

          </Grid>
        </Container>

        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }
  