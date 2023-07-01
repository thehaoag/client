import React, {useState, useCallback} from "react";
import {InputGroup, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Search = ({parentCallback}) => {

    const [code, setCode] = useState('');
    //const [itemsList, setItemsList] = useState([]);

    const Search = useCallback(() => {
        if (code)
        {
          fetch(`/getListStudents/${code}`).then((res) =>
            res.json().then((data) => {
              // Setting a data from api
              //setCurrentCode(code)
              console.log(data)
              //console.log(currentCode)
              //setItemsList(data);
              parentCallback(data)
            })
          );
          
        }
    }, [code, parentCallback])

    
    return (
        <Container fluid>
            <Row>
                <Col sm={3} >
                    <InputGroup className="mb-3 mt-3">
                        <Form.Control className="pt-2 pb-2"
                            placeholder="Nhập mã lớp" 
                            aria-label="Nhập mã lớp" aria-describedby="basic-addon2" 
                            value={code} onChange={event => setCode(event.target.value)}/>
                        <Button variant="outline-primary" id="button-addon2" disabled = {!code} onClick={Search}>Search</Button>
                    </InputGroup>
                </Col>
                <Col sm={5}>
                    <InputGroup className="mb-3 mt-3">
                        <Alert className="pt-2 pb-2" variant="danger">This is a danger alert - check it out!</Alert>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Search