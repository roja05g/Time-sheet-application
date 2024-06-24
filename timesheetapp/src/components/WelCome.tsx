import { Col, Container, Row } from "react-bootstrap";
import "../components/welcome.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { orange } from "@mui/material/colors";

function WelCome() {
  return (
    <div
      className="bg-danger-subtle absolute flex justify-center align-items-center h-100 w-100 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1483840130/photo/digital-technology-software-development-concept-coding-programmer-software-engineer-working.jpg?s=612x612&w=0&k=20&c=iieyTFcAeRpBylPh8fjiTcql_lcCNuoSNhi9EeOlVbE=)`,
      }}
    >
      <Container fluid>
        <Row className="flex justify-center align-items-center ">
        <Col className="text-white text-center text-6xl text-primary font-bold font-effect-fire-animation custom-animation ">
              Welcome To Attendance System Application !!!&nbsp;.&nbsp;.&nbsp;.
            </Col>
        </Row>
        <Row className="mt-12">
        <Col className="flex justify-center align-items-center">
          <Link to='/register'>
            <Button variant="contained" color="warning" className="rounded-full" sx={{bgcolor:orange[400],borderRadius:"20px"}}>Employee</Button>
            </Link>
            <Link to='/admincomp'>
            <Button variant="contained" color="warning" className="ms-5" sx={{bgcolor:orange[400],borderRadius:"20px"}}>Admin</Button>
            </Link>
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WelCome;