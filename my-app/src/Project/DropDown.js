import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import "./Css/DropDown.css"
import Button from 'react-bootstrap/Button';

function DropDown() {
  return (
    <div>
    <div className='drop'>  
     <Container className='container' fluid>
<div className='r1'>

      
<Row >
<Col lg={6} md={6} xs={12}>
<h1>FAQ</h1>
<p>Here are some of the Questions we got
   frequently from our customers. Hope it'll 
   help you. If you have questions, Please feel free 
   to contact us.</p>
   <Button variant="success">Call Us</Button>
  </Col>
</Row>
</div>

<div className='r2'>
      <Row>
      <Col lg={6} md={6} xs={12}>
         <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Dental clinic near me?</Accordion.Header>
        <Accordion.Body>
        From your location, Kodambakkam Kalaa Dental Care is the near one to you.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Why do i need dental exams?</Accordion.Header>
        <Accordion.Body>
        Regular exams help spot trouble early to prevent bigger and more costly treatments later.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>You do teeth whitening?</Accordion.Header>
        <Accordion.Body>
        Yes, we do. We have Laser teeth whitening. It is an adavanced form of dental treatment.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Is fillings need to do regularly?</Accordion.Header>
        <Accordion.Body>
        No. Usually, fillings last for many years, but if they break or wear down, they will need to be replaced.
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
    </Col>
    </Row>
    </div>
    </Container>

    </div>


    
 </div>
 
  );
}

export default DropDown;