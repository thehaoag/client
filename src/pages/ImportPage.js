import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Typography, Container, Card, CardHeader, Alert, Snackbar, Grid } from '@mui/material';
// sections
import { ImportCourse, ImportStudents, ImportFace} from '../sections/@dashboard/import';
// components
import useToken from '../components/useToken';

// ----------------------------------------------------------------------


export default function ImportPage() {
    const [errorMsg, seterrorMsg] = useState('');

    const [openMessage, setOpenMessage] = useState(false);
    const handleCloseMessage = () => {
        setOpenMessage(false);
    };

    const showMessage = (msg) => {
        seterrorMsg(msg)
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
                <Card>
                    <CardHeader title='Import Course'/>
                    <ImportCourse token={token} showMessage={showMessage}/>
                </Card>
                {token && token.account.role === 'admin'
                    ?
                    <Grid sx={{ mt: 1 }} container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardHeader title='Import List Students'/>
                                <ImportStudents token={token} showMessage={showMessage}/>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardHeader title='Import Face'/>
                                <ImportFace token={token} showMessage={showMessage}/>
                            </Card>
                        </Grid>
                    </Grid>
                    
                    : <></>
                }
            </Container>

            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openMessage} autoHideDuration={5000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    );
}
