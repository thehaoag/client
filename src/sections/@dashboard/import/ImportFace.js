import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, Button } from '@mui/material';

ImportStudents.propTypes = {
    showMessage: PropTypes.func,
    token: PropTypes.object
}; 

export default function ImportStudents({token, showMessage}) {

    const [importForm, setImportForm] = useState({
        file: null,
        createBy: token && token.account.id,
        createByName: token && token.account.name
    })
    
    const handleChange = (event) => { 
        const {value, name, files} = event.target
        if (files && files.length > 0)
            setImportForm(prevNote => ({
                ...prevNote, [name]: files.item(0)}))
        else
            setImportForm(prevNote => ({
                ...prevNote, [name]: value}))
    }

    const handleClick = () => {
        showMessage('test')
        /* const data = new FormData();
        data.append('file', importForm.file, importForm.file.name);
        data.append("createBy", importForm.createBy)
        data.append("createByName", importForm.createByName)

        const requestOptions = {
            method: 'POST',
            body: data
        }

         fetch(`/importStudents`, requestOptions).then((res) =>
            res.json().then((result) => {
                if (result.success === true)
                    showMessage(result.msg)
                else
                    showMessage(result.msg)
            })
        ); */
    }

    return (
        <Grid justifyContent="center" alignItems="center" sx={{ mb: 3, mt: 1 }} container spacing={2}>
            <Grid item xs={12} sm={6}>
                <input accept='.zip,.rar' 
                    type='file' name='file' onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button variant="contained" 
                    disabled = {importForm.file === null || importForm.file === ''} 
                    onClick={handleClick}>
                        Import
                </Button>
            </Grid>
        </Grid>
    )
}