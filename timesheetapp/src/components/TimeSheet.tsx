import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./ReduxComponents/rootReducer";
import ModelTLSheet from "./ModelTLSheet";

interface TimeSheetProps {
  setshowdata: (value: string) => void;
}

const TimeSheet: React.FC<TimeSheetProps> = ({ setshowdata }) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [dates, setdates] = useState({
    E_Id: user?.empId,
    E_Name: user?.name,
    From_date: "",
    To_date: "",
    From_time: "",
    TO_time: "",
    WorkLocation: "WO",
  });

  const [FromError, setFromError] = useState("");
  const [FTimeError, setFTimeError] = useState("");
  const [ToError, setToError] = useState("");
  const [ToTimeError, setToTimeError] = useState("");

  const [show, setshow] = useState(false);
  const [message, setmessage] = useState("");

  let checkFromdate = () => {
    if (dates.From_date) {
      setFromError("");
      return true;
    } else {
      setFromError("date Required");
    }
  };

  let checkFromTime = () => {
    if (dates.From_time) {
      setFTimeError("");
      return true;
    } else {
      setFTimeError("Time Required ");
    }
  };

  let checkTOdate = () => {
    if (dates.To_date) {
      setToError("");
      return true;
    } else {
      setToError("date Required");
    }
  };

  let checkToTime = () => {
    if (dates.TO_time) {
      setToTimeError("");
      return true;
    } else {
      setToTimeError("Time Required ");
    }
  };

  let checkCheckbox = (e: any) => {
    if (e.target.checked) {
      setdates({ ...dates, WorkLocation: "WFO" });
    }
  };

  let checkdates = async () => {
    checkTOdate();
    checkFromdate();
    checkFromTime();
    checkToTime();

    if (checkFromdate() && checkTOdate() && checkFromTime() && checkToTime()) {
      await axios
        .post("https://66064a01d92166b2e3c388ea.mockapi.io/user/user", dates)
        .then(() => {
          setmessage("TimeSheet Data Send Successful");
          setshow(true);
          setdates({
            ...dates,
            From_date: "",
            To_date: "",
            From_time: "",
            TO_time: "",
            WorkLocation: "",
          });
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
            <h1 className="text-center text-4xl text-blue-800 font-semibold">
              Employee Details{" "}
            </h1>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Form.Label className="ms-2">Name&nbsp;:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Name"
                    className="w-2/3 ms-1"
                    value={user?.name.toUpperCase()}
                    disabled
                  />
                </div>
                <div className="d-flex align-items-center">
                  <Form.Label className="ms-2 float-end">ID&nbsp;:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="E_ID"
                    className="ms-2 w-2/5"
                    disabled
                    value={user?.empId}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col sm={12} md={8} xs={12} className="mx-auto">
            <h1 className="text-center text-2xl font-semibold  text-blue-800">
              Employee Time-Details{" "}
            </h1>
          </Col>
        </Row>
        <Row className="mx-auto mt-10">
          <Col>
            <div>
              <Form.Label className="ms-2">From</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="Date"
                  placeholder="Enter The Date"
                  className="w-75"
                  name="From_date"
                  value={dates.From_date}
                  onChange={(e) => {
                    setdates({ ...dates, From_date: e.target.value });
                  }}
                />
                <Form.Control
                  type="Time"
                  placeholder="Enter The Time"
                  className="ms-2 w-5/12"
                  name="From_time"
                  value={dates.From_time}
                  onChange={(e) => {
                    setdates({ ...dates, From_time: e.target.value });
                  }}
                />
              </div>
              <>
                {FromError && (
                  <span className="text-danger ms-2 w-32">{FromError}</span>
                )}
                {FTimeError && (
                  <span className="text-danger float-end">{FTimeError}</span>
                )}
              </>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label className="ms-2">To</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="Date"
                  placeholder="Enter The Date"
                  className="w-75"
                  name="From_date"
                  value={dates.To_date}
                  onChange={(e) => {
                    setdates({ ...dates, To_date: e.target.value });
                  }}
                />
                <Form.Control
                  type="Time"
                  placeholder="Enter The Time"
                  className="ms-2 w-5/12"
                  name="TO_time"
                  value={dates.TO_time}
                  onChange={(e) => {
                    setdates({ ...dates, TO_time: e.target.value });
                  }}
                />
              </div>
              <>
                {ToError && (
                  <span className="text-danger ms-2 w-32">{ToError}</span>
                )}
                {ToTimeError && (
                  <span className="text-danger float-end">{ToTimeError}</span>
                )}
              </>
            </div>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            <div className="d-flex justify-content-end align-items-center">
              <Form.Check
                reverse
                inline
                value={"wfo"}
                label="WFO"
                name="group1"
                type="checkbox"
                id={`inline-checkbox-1`}
                onClick={(e) => {
                  checkCheckbox(e);
                }}
              />
            </div>
          </Col>
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
          setshow={setshow}
          show={show}
          message={message}
          setshowdata={setshowdata}
        />
      </Row>
    </Container>
  );
};

export default TimeSheet;
