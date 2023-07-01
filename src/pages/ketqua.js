import React, {useState} from 'react'
import {Table, Pagination, Container} from 'react-bootstrap';
import Search from '../components/Search';

const Ketqua = () => {

  const [listStudents,setListStudents] = useState([])

  const handleCallback = (childData) => {
    setListStudents(childData.listStudents)
  }

  return (
    <>
      <Search parentCallback={handleCallback}/>
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