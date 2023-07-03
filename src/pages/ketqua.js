import React, {useState} from 'react'
import {Table, Pagination, Container,Row, Col, Alert, InputGroup} from 'react-bootstrap';
import Search from '../components/Search';

const Ketqua = () => {

  const [listStudents,setListStudents] = useState([])
  const [msgError, setMsgError] = useState('');

  const handleCallback = (childData) => {
    if (childData.success === true)
    {
      setListStudents(childData.listStudents)
      setMsgError('')
    }
    else
    {
      setMsgError(childData.msg)
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Search parentCallback={handleCallback}/> 
          <Col sm={5}>
            <InputGroup className="mb-3 mt-3">
              <Alert show={msgError !== ''} className="pt-2 pb-2" variant="danger">{msgError}</Alert>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container style={{height: '500px'}} fluid>
        <Table striped hover bordered responsive className='mb-0' style={{maxHeight: '500px'}}>
          <thead>
            <tr style={{whiteSpace:'nowrap'}}>
              <th>#</th>
              <th>MSSV</th>
              <th>Họ và tên</th>
            </tr>
          </thead>

          <tbody>
            { listStudents &&
              listStudents.map((item, i) =>
                <tr key={i} style={{whiteSpace:'nowrap'}}>
                  <td>{i+1}</td>
                  <td>{item.mssv}</td>
                  <td>{item.name}</td>
                </tr>
              )
            }
          </tbody>
        </Table>

        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </>
  )
}

export default Ketqua