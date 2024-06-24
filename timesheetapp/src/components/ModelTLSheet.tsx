import { Button } from "@mui/material";
import { Col, Container, Modal, Row } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TimeSheetProps {
  setshow: (value: boolean) => void;
  show: boolean;
  message:string;
  setshowdata:(value:string)=>void;
 
}

const ModelTLSheet: React.FC<TimeSheetProps> = ({ setshow, show,message,setshowdata }) => {
  return (
    <Container fluid>
      <Row>
        <Col className="flex justify-center">
          <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Body className="flex flex-col align-items-center ">
              <CheckCircleIcon color="success" sx={{ fontSize: 70 }} />
              <p className="text-2xl font-semibold">{message}</p>
              <Button
                variant="contained"
                className="mt-4"
                onClick={() => {
                  setshow(false) ,setshowdata("Nodata");
                }}
              >
                Ok
              </Button>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ModelTLSheet;
