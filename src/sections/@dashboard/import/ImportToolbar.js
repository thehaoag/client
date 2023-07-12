import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
// components
import useToken from '../../../components/useToken';

ImportToolbar.propTypes = {
    showMessage: PropTypes.func
}; 

export default function ImportToolbar({showMessage}) {

    const { token } = useToken()

    function getYear() {
        const currentYear = new Date()
        if (currentYear.getMonth() > 7)
            return currentYear.getFullYear()+1
        return currentYear.getFullYear()
    }

    function getSemester() {
        const currentDate = new Date()
        const month = currentDate.getMonth()
        switch(true)
        {
            case month >= 8 && month <= 11:
                return 1
            case month >= 12 || (month >= 1 && month <= 3):
                return 2
            case month >= 4 && month <= 7:
                return 3
            default:
                return 1
        }
    }

    const [importForm, setImportForm] = useState({
        year: getYear(),
        semester: getSemester(),
        file: {},
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
        data.append('year', importForm.year)
        data.append("semester", importForm.semester)
        data.append('file', importForm.file, importForm.file.name);
        data.append("createBy", importForm.createBy)
        data.append("createByName", importForm.createByName)

        const requestOptions = {
            method: 'POST',
            body: data
        }

        fetch(`/importCourse`, requestOptions).then((res) =>
            res.json().then((result) => {
                if (result.success === true)
                    showMessage(result.msg)
                else
                    showMessage(result.msg)
            })
        );
    }

    return (
        <Grid justifyContent="center" alignItems="center" sx={{ mb: 2, mt: 2 }} container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="lbYear">Year</InputLabel>
                    <Select
                        labelId="lbYear"
                        id="inputYear"
                        value={importForm.year}
                        name="year"
                        label="Year"
                        onChange={handleChange}
                    >
                        {
                            [...Array(3)].map((_, index) => {
                                const currentDate = new Date()
                                let sYear = currentDate.getFullYear() - (2-index)
                                if (currentDate.getMonth() > 7)
                                    sYear = currentDate.getFullYear()+1 - (2-index)

                                return (
                                    <MenuItem key={index} value={sYear}>{sYear-1}-{sYear}</MenuItem>
                                )
                            })
                        }
                        
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="lbSemester">Semester</InputLabel>
                    <Select
                        labelId="lbSemester"
                        id="inputSemester"
                        name="semester"
                        value={importForm.semester}
                        label="Semester"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Semester 1</MenuItem>
                        <MenuItem value={2}>Semester 2</MenuItem>
                        <MenuItem value={3}>Summer Semester</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <input accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
                    type='file' name='file' onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Button variant="contained" 
                    disabled = {importForm.year === 0 || importForm.semester === 0} 
                    onClick={handleClick}>
                        Import
                </Button>
            </Grid>
        </Grid>
    )
}