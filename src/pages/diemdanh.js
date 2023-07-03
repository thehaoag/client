import { useState } from 'react';
import Search from '../components/Search';
import { Container, Row, Col, Alert, InputGroup, Button, ListGroup, Image} from 'react-bootstrap';

const Diemdanh = () => {

  const [itemsList, setItemsList] = useState([]);
  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState('');
  const [msgError, setMsgError] = useState('');

  const handleCallback = (childData) => {
    if (childData.success === true)
    {
      setCode(childData.currentCode)
      setMsgError('')
    }
    else
    {
      setMsgError(childData.msg)
    }
    
  }

  const Diemdanh = () => {
    if (code)
    {
      fetch(`/diemdanh/${code}`).then((res) =>
        res.json().then((data) => {
          if (data.success === true)
          {
            setItemsList([...itemsList,data.data])
            setMsgError('')
          }
          else
          {
            setMsgError(data.msg)
          }
        })
      );
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
      
      <Container fluid>  
        <Row style={{height: '500px'}}>
          <Col sm={9} >
            {
              camera 
              ? <Image src="http://localhost:5000/video" style={{width: '100%', height: '480px'}} alt='camera-on'/>
              : <Image src={require('../Images/camera-notload.jpeg')} style={{width: '100%', height: '480px'}} alt="camera-off"/>
            }
            
          </Col>
          <Col sm={3}>
            <ListGroup style={{maxHeight: '500px', overflow: 'auto'}} className='h-100'>
              {
                itemsList.map(item => <ListGroup.Item key={item.mssv}>{item.mssv} - {item.name}</ListGroup.Item>)
              }
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={9} className='text-center' >
            <Button className='mg-auto me-2' onClick={() => setCamera(!camera)}>Tắt/Mở Camera</Button>
            <Button className='mg-auto' onClick={Diemdanh}>Điểm danh</Button>
          </Col>
          <Col sm={3}>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Diemdanh