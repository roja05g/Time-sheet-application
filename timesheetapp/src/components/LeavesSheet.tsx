import { Button } from "@mui/material";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./ReduxComponents/rootReducer";

import axios from "axios";

import ModelTLSheet from "./ModelTLSheet";

interface LeaveSheetProps {
  setshowdata: (value: string) => void;
}

const LeavesSheet: React.FC<LeaveSheetProps> = ({ setshowdata }) => {
  const user = useSelector((state: RootState) => state.user.user);

  let getmessage = useSelector((state: RootState) => state.userMessage.message);
console.log(getmessage);


  const [Leavedates, setLeavedates] = useState({
    E_Id: user?.empId,
    E_Name: user?.name,
    From_date: "",
    To_date: "",
    reason: "",
    Approved:"pending"
  });

  console.log(Leavedates);

  const [FromError, setFromError] = useState("");
  const [ToError, setToError] = useState("");
  const [ErrorReson, setErrorReson] = useState("");

  const [show, setshow] = useState(false);
  const [message, setmessage] = useState("");

  let checkFromdate = () => {
    if (Leavedates.From_date) {
      setFromError("");
      return true;
    } else {
      setFromError("date Required");
    }
  };

  let checkTOdate = () => {
    if (Leavedates.To_date) {
      setToError("");
      return true;
    } else {
      setToError("date Required");
    }
  };

  let checkreson = () => {
    if (Leavedates.reason) {
      setErrorReson("");
      return true;
    } else {
      setErrorReson("Required Reason");
    }
  };

  let checkdates = async () => {
    checkTOdate();
    checkFromdate();
    checkreson();
    if (checkFromdate() && checkTOdate() && checkreson()) {
      await axios
        .post(
          "https://66082db0a2a5dd477b141c83.mockapi.io/LeaveDetails",
          Leavedates
        )
        .then(() => {
          setmessage("LeaveSheet Data Send Successful");
          setshow(true);
          setLeavedates({ ...Leavedates, From_date: "", To_date: "" });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <Container
      fluid
      className="d-flex h-100 absolute justify-content-center align-items-center"
    >
      <Row className="custom-width bg-gradient-to-r from-sky-50 to-yellow-100 m-auto rounded-xl shadow-lg ">
        <Row className="mx-auto mt-3">
          <Col sm={12} md={8} xs={12} className="mx-auto">
            <h1 className="text-center text-4xl font-semibold  text-blue-800">
              Employee Details
            </h1>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Form.Label className="ms-2">Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Name"
                    className="w-2/3"
                    value={user?.name.toUpperCase()}
                    disabled
                  />
                </div>
                <div className="d-flex align-items-center">
                  <Form.Label className="ms-2 float-end">ID:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee ID"
                    className="ms-2 w-2/5"
                    disabled
                    value={user?.empId}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mx-auto mt-3 ">
          <Col
            sm={12}
            md={8}
            xs={12}
            className="mx-auto d-flex flex-wrap justify-content-center"
          >
            <h3 className="text-center text-2xl font-semibold d-flex flex-wrap  text-blue-800">
              Employee Leave-Sheet
            </h3>
          </Col>
        </Row>
        <Row className="mx-auto mt-10 d-flex justify-content-center align-items-center">
          <Col>
            <div className="d-flex justify-content-end align-items-center">
              <Form.Label className="ms-2">From:&nbsp;</Form.Label>
              <Form.Control
                type="Date"
                placeholder="Enter The Date"
                className="w-75"
                name="From_date"
                value={Leavedates.From_date}
                onChange={(e) => {
                  setLeavedates({ ...Leavedates, From_date: e.target.value });
                }}
              />
            </div>
            {FromError && (
              <p className="text-danger flex justify-center">{FromError}</p>
            )}
          </Col>
          <Col>
            <div className="d-flex justify-content-end align-items-center">
              <Form.Label className="ms-2">To:&nbsp;</Form.Label>
              <Form.Control
                type="Date"
                placeholder="Enter The Date"
                className="w-75"
                name="From_date"
                value={Leavedates.To_date}
                onChange={(e) => {
                  setLeavedates({ ...Leavedates, To_date: e.target.value });
                }}
              />
            </div>
            {ToError && (
              <p className="text-danger flex justify-center">{ToError}</p>
            )}
          </Col>
          <Row className="mt-4">
            <Col>
              <div className="d-flex justify-content-center align-items-center">
                <Form.Label className="ms-2">Reason:&nbsp;</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="reason"
                  value={Leavedates.reason}
                  onChange={(e) => {
                    setLeavedates({ ...Leavedates, reason: e.target.value });
                  }}
                />
              </div>
              {ErrorReson && (
                <p className="text-danger flex justify-center">{ErrorReson}</p>
              )}
            </Col>
          </Row>
        </Row>
        <Row className="mx-auto mt-5 mb-4">
          <Col className="text-center">
            <Button variant="contained" className="" onClick={checkdates}>
              Submit
            </Button>
          </Col>
        </Row>
      </Row>
      <Row>
        <ModelTLSheet
          show={show}
          message={message}
          setshow={setshow}
          setshowdata={setshowdata}
        />
      </Row>
    </Container>
  );
};

export default LeavesSheet;
