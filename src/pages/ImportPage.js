import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Typography, Container, Card, CardHeader, Alert, Snackbar } from '@mui/material';
// sections
import { ImportToolbar } from '../sections/@dashboard/import';

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
                    <ImportToolbar showMessage={showMessage}/>
                </Card>
            </Container>

            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openMessage} autoHideDuration={5000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    );
}
