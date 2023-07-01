import { useState } from 'react';
import Search from '../components/Search';
import { Container, Row, Col, Button, ListGroup, Image} from 'react-bootstrap';

const Diemdanh = () => {

  const [itemsList, setItemsList] = useState([{id: '1', name: 'Dapibus ac facilisis in'}]);
  const [camera, setCamera] = useState(false);

  const handleCallback = (childData) => {
    setItemsList(childData.listStudents)
  }

  return (
    <>
      <Search parentCallback={handleCallback}/>
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
                itemsList.map(item => <ListGroup.Item key={item.id}>{item.id} - {item.name}</ListGroup.Item>)
              }
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={9} className='text-center' >
            <Button className='mg-auto' onClick={() => setCamera(!camera)}>Turn On/Off Camera</Button>
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