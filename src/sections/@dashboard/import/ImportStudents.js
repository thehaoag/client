import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, Button } from '@mui/material';

ImportStudents.propTypes = {
    showMessage: PropTypes.func,
    token: PropTypes.object,
    setLoading: PropTypes.func
}; 

export default function ImportStudents({token, showMessage, setLoading}) {

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
        
        const data = new FormData();
        data.append('file', importForm.file, importForm.file.name);
        data.append("createBy", importForm.createBy)
        data.append("createByName", importForm.createByName)

        const requestOptions = {
            method: 'POST',
            body: data
        }
        setLoading(true)
        fetch(`/importStudents`, requestOptions).then((res) =>
            res.json().then((result) => {
                if (result.success === true)
                    showMessage(result.success, result.msg)
                else
                    showMessage(result.success, result.msg)

                setLoading(false)
            })
        );
    }

    const handleClickFace = () => {
        setLoading(true)

        fetch(`/testRemoveFace`).then((res) =>
            res.json().then((result) => {
                if (result.success === true)
                    showMessage(result.success, result.msg)
                else
                    showMessage(result.success, result.msg)
                
                setLoading(false)
            })
        ); 
    }

    return (
        <Grid justifyContent="center" alignItems="center" sx={{ mb: 3, mt: 1 }} container spacing={2}>
            <Grid item xs={12} sm={6}>
                <input accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
                    type='file' name='file' onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button variant="contained" 
                    disabled = {importForm.file === null || importForm.file === ''} 
                    onClick={handleClick}>
                        Import
                </Button>
                <Button sx={{ ml:1 }} variant="contained" 
                    onClick={handleClickFace}>
                        Remove
                </Button>
            </Grid>
        </Grid>
    )
}