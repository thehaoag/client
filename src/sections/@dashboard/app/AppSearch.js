import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Grid, Button, InputLabel, FormControl, MenuItem, Select } from "@mui/material";

AppSearch.propTypes = {
    setCurentCode: PropTypes.func,
    refreshPage: PropTypes.func,
    showMessage: PropTypes.func
};

export default function AppSearch({ setCurentCode, refreshPage, showMessage }) {
    
    const [year, setYear] = useState(() => {
        const currentYear = new Date()
        if (currentYear.getMonth() > 7)
            return currentYear.getFullYear()+1
        return currentYear.getFullYear()
    });

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const [semester, setSemester] = useState(() => {
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
    });

    const handleChangeSemester = (event) => {
        setSemester(event.target.value);
    };

    

    const [code, setCode] = useState('');

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    const [group, setgroup] = useState('');

    const handleChangeGroup = (event) => {
        setgroup(event.target.value);
    };

    const handleClick = () => {
        if (code)
        {
            fetch(`/getListStudents/${code}`).then((res) =>
                res.json().then((data) => {
                    if (data.success === true)
                    {
                        if (refreshPage !== undefined)
                            refreshPage(data.listStudents)
                        
                        if (setCurentCode !== undefined)
                            setCurentCode(data.currentCode)
                    }
                    else
                    {
                        showMessage(data.msg)
                    }
                    
                })
            );
        }
        
    };

    return (
        <Grid justifyContent="center" alignItems="center" container sx={{ mb: 2 }} spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
                <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="lbYear">Year</InputLabel>
                    <Select
                        labelId="lbYear"
                        id="inputYear"
                        value={year}
                        label="Year"
                        onChange={handleChangeYear}
                    >
                        {
                            [...Array(3)].map((item, index) => {
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
                        value={semester}
                        label="Semester"
                        onChange={handleChangeSemester}
                    >
                        <MenuItem value={1}>Semester 1</MenuItem>
                        <MenuItem value={2}>Semester 2</MenuItem>
                        <MenuItem value={3}>Summer Semester</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="lbCode">Course Code</InputLabel>
                    <Select
                        labelId="lbCode"
                        id="inputCode"
                        value={code}
                        label="Course Code"
                        onChange={handleChangeCode}
                    >
                        <MenuItem value={'H001'}>503005 - Lập trình hướng đối tượng</MenuItem>
                        <MenuItem value={'H002'}>503006 - Lập trình hướng đối tượng</MenuItem>
                        <MenuItem value={'H003'}>503007 - Lập trình hướng đối tượng</MenuItem>
                        <MenuItem value={'H004'}>503008 - Lập trình hướng đối tượng</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1.1}>
                <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="lbGroup">Group</InputLabel>
                    <Select
                        labelId="lbGroup"
                        id="inputGroup"
                        value={group}
                        label="Group"
                        onChange={handleChangeGroup}
                    >
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} alignItems={"center"}>
                <Button variant="contained" disabled = {!code} onClick={handleClick}>Submit</Button>
            </Grid>
        </Grid>
    );
}