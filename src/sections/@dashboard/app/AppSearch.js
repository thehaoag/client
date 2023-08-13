import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Grid, Button, InputLabel, FormControl, MenuItem, Select, Backdrop, CircularProgress } from "@mui/material";

AppSearch.propTypes = {
    refreshPage: PropTypes.func,
    showMessage: PropTypes.func,
    token:  PropTypes.object
};

export default function AppSearch({ token, refreshPage, showMessage }) {
    
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

    const [listCourse, setListCourse] = useState([])
    const [responseData, setResponseData] = useState([])
    const [listGroup ,setListGroup] = useState([])
    const [loading, setLoading] = useState(false);

    const [submitForm, setSubmitForm] = useState({
        year: getYear(),
        semester: getSemester(),
        maMH: '',
        group: ''
    })

    const handleChange = (event) => { 
        const {value, name} = event.target
        setSubmitForm(prevNote => ({
            ...prevNote, [name]: value}))
        if (name === 'maMH')
        {
            const groups = responseData.filter(item => item.MaMH === value)
            setListGroup(groups)
        }
    }
    

    const handleClick = () => {
        if (submitForm.year > 0 && submitForm.semester > 0 && submitForm.maMH && submitForm.group > 0)
        {
            setLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitForm)
            }
            const rootUrl = process.env.NODE_ENV === "production" ? "https://thehaoag.pythonanywhere.com" : ""
            fetch(`${rootUrl}/getListStudents`, requestOptions).then((res) =>
                res.json().then((result) => {
                    if (result.success === true)
                    {
                        if (refreshPage !== undefined)
                            refreshPage(result.sessions ,result.listStudents)
                        
                    }
                    else
                    {
                        showMessage(result.success, result.msg)
                    }
                    setLoading(false)
                })
            );
        }  
    };

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"year": submitForm.year, "semester": submitForm.semester, "userID": token.account.id})
        }
        const rootUrl = process.env.NODE_ENV === "production" ? "https://thehaoag.pythonanywhere.com" : ""
        fetch(`${rootUrl}/loadCourseData`, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result.success === true)
                {
                    setResponseData(result.data)

                    const key = 'MaMH';
                    const arrayUniqueByKey = [...new Map(result.data.map(item =>
                        [item[key], item])).values()];

                    setSubmitForm(prevNote => ({
                        ...prevNote, 'maMH': ''}))
                    setListCourse(arrayUniqueByKey)
                    setSubmitForm(prevNote => ({
                        ...prevNote, 'group': ''}))
                    setListGroup([])
                }
                else
                {
                    showMessage(result.success, result.msg)
                }    
            })
    }, [submitForm.year, submitForm.semester, token.account.id, showMessage]);

    return (
        <>
            <Grid justifyContent="center" alignItems="center" container sx={{ mb: 2 }} spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl sx={{ width: '100%' }} size="small">
                        <InputLabel id="lbYear">Year</InputLabel>
                        <Select
                            labelId="lbYear"
                            id="inputYear"
                            value={submitForm.year}
                            name="year"
                            label="Year"
                            onChange={handleChange}
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
                            name="semester"
                            value={submitForm.semester}
                            label="Semester"
                            onChange={handleChange}
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
                            value={submitForm.maMH}
                            name="maMH"
                            label="Course Code"
                            onChange={handleChange}
                        >
                            {
                                listCourse && listCourse.map((course,index) => {
                                    const {MaMH, TenMH} = course
                                    return (
                                        <MenuItem key={index} value={MaMH}>{MaMH} - {TenMH}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={1.1}>
                    <FormControl sx={{ width: '100%' }} size="small">
                        <InputLabel id="lbGroup">Group</InputLabel>
                        <Select
                            labelId="lbGroup"
                            id="inputGroup"
                            value={submitForm.group}
                            name="group"
                            label="Group"
                            onChange={handleChange}
                        >
                            {
                                listGroup && listGroup.map((item, index) => {
                                    const { Nhom } = item
                                    return (
                                        <MenuItem key={index} value={Nhom}>{Nhom}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={1} alignItems={"center"}>
                    <Button variant="contained" disabled = {submitForm.year === 0 || submitForm.semester === 0 || !submitForm.maMH || !submitForm.group} 
                        onClick={handleClick}>
                            Submit
                    </Button>
                </Grid>
            </Grid>
            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}