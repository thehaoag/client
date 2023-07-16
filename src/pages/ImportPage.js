import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Typography, Container, Card, CardHeader, Alert, Snackbar, Grid, Backdrop, CircularProgress } from '@mui/material';
// sections
import { ImportCourse, ImportStudents, ImportFace} from '../sections/@dashboard/import';
// components
import useToken from '../components/useToken';

// ----------------------------------------------------------------------


export default function ImportPage() {
    const [message, setMessage] = useState({
        Success: true,
        Content: ""
    });
    const [loading, setLoading] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const handleCloseMessage = () => {
        setOpenMessage(false);
    };

    const showMessage = (isSuccess, msg) => {
        setMessage({
          Success: isSuccess,
          Content: msg
        })
        setOpenMessage(true);
    };

    const { token } = useToken()

    return (
        <>
            <Helmet>
                <title> Import Data | Minimal UI </title>
            </Helmet>

            <Container>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Import Data
                </Typography>
                {token && token.account.role === 'teacher'
                    ?
                    <Card>
                        <CardHeader title='Import Course'/>
                        <ImportCourse token={token} showMessage={showMessage} setLoading={setLoading}/>
                    </Card>
                    : <></>
                }
                
                {token && token.account.role === 'admin'
                    ?
                    <Grid sx={{ mt: 1 }} container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardHeader title='Import List Students'/>
                                <ImportStudents token={token} showMessage={showMessage} setLoading={setLoading}/>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardHeader title='Import Face'/>
                                <ImportFace token={token} showMessage={showMessage} setLoading={setLoading}/>
                            </Card>
                        </Grid>
                    </Grid>
                    
                    : <></>
                }
            </Container>

            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openMessage} autoHideDuration={5000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} variant="filled" severity={message.Success ? "success" : "error"} sx={{ width: '100%' }}>
                    {message.Content}
                </Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
