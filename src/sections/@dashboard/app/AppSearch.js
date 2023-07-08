import React, { useState } from "react";
import PropTypes from 'prop-types';
import {InputGroup, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

AppSearch.propTypes = {
    setCurentCode: PropTypes.func,
    refreshPage: PropTypes.func,
    showMessage: PropTypes.func
};

export default function AppSearch({ setCurentCode, refreshPage, showMessage }) {

    const [code, setCode] = useState('');

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
        <InputGroup className="m-3 w-50">
            <Form.Control className="pt-2 pb-2"
                placeholder="Type class code" 
                aria-label="Type class code" aria-describedby="basic-addon2" 
                value={code} onChange={event => setCode(event.target.value)}/>
            <Button variant="outline-primary" id="button-addon2" disabled = {!code} onClick={handleClick}>Submit</Button>
        </InputGroup>
      );
}