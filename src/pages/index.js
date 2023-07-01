import React from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid="sm" style={{marginTop:'100px'}}>
      <Row>
        <Col>
          <div className='m-auto' style={{width: '90%'}}>
            <Card className="text-center">
              <Card.Img variant="top" src={require('../Images/import.png')} style={{height: '350px'}}/>
              <Card.Body>
                <Button className='w-100' href='#' variant="primary">Training</Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col>
        <div className='m-auto' style={{width: '90%'}}>
            <Card className="text-center">
              <Card.Img variant="top" src={require('../Images/diem-danh.png')} style={{height: '350px'}} />
              <Card.Body>
                <Button className='w-100' href='/diem-danh' variant="primary">Điểm danh</Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col>
        <div className='m-auto' style={{width: '90%'}}>
            <Card className="text-center">
              <Card.Img variant="top" src={require('../Images/class.png')} style={{height: '350px'}} />
              <Card.Body>
                <Button className='w-100' href='/ket-qua' variant="primary">Kết quả</Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home