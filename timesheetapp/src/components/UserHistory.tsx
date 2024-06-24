import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./ReduxComponents/rootReducer";
import { Col, Container, Row, Table } from "react-bootstrap";

interface TimeEvent {
  E_Id: string;
  E_Name: string;
  From_date: string;
  From_time: string;
  TO_time: string;
}
interface LeaveEvent {
  E_Id: string;
  E_Name: string;
  From_date: string;
  To_date: string;
  reason: string;
  Approved: string;
}

function UserHistory() {
  const [timeSheetData, setTimeSheetData] = useState<TimeEvent[]>([]);
  const [leaveSheetData, setLeaveSheetData] = useState<LeaveEvent[]>([]);

  const user = useSelector((state: RootState) => state.user.user);
  

  useEffect(() => {
    fetchLeaveData();
    fetchTimeSheetData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      let datum: any = [];
      const response = await axios.get<LeaveEvent[]>(
        "https://66082db0a2a5dd477b141c83.mockapi.io/LeaveDetails"
      );
      response.data.forEach((e) => {
        if (e.E_Id === user?.empId) {
          datum.push(e);
        }
      });
      setLeaveSheetData(datum);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  const fetchTimeSheetData = async () => {
    try {
      let datum: any = [];
      const response = await axios.get<TimeEvent[]>(
        "https://66064a01d92166b2e3c388ea.mockapi.io/user/user"
      );
      response.data.forEach((e) => {
        if (e.E_Id === user?.empId) {
          datum.push(e);
        }
      });
      setTimeSheetData(datum);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex h-100 absolute flex justify-content-center align-items-center "
    >
      <Row className=" bg-gradient-to-r from-sky-50 to-yellow-100 m-auto rounded-xl shadow-lg ">
        <Row className="mx-auto mt-3">
          <Col sm={8} md={8} xs={8} className="mx-auto">
            <h4 className="text-center text-3xl font-semibold">
              Employee TimeSheet Details{" "}
            </h4>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            {timeSheetData.length > 0 ? (
              <Table striped bordered responsive>
                <thead>
                  <tr className="text-center">
                    <th>Emp Id</th>
                    <th>Emp Name</th>
                    <th className="row-span-5" style={{ width: "120px" }}>
                      Date
                    </th>
                    <th>Login Time</th>
                    <th>Logout Time</th>
                    <th>Work Location</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSheetData.map((value: any, index: number) => (
                    <tr key={index} className="text-center">
                      <td>{value.E_Id}</td>
                      <td>{value.E_Name}</td>
                      <td>{value.From_date.split("-").reverse().join("-")} </td>
                      <td>{value.From_time}</td>
                      <td>{value.TO_time}</td>
                      <td>{value.WorkLocation}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h1 className="text-center text-3xl p-1 text-blue-800">
                Currently there is no timesheet details in the history
              </h1>
            )}
          </Col>
        </Row>

        {/* --------------------------------------------------- */}

        <Row className="mx-auto mt-3">
          <Col sm={8} md={8} xs={8} className="mx-auto">
            <h4 className="text-center text-3xl font-semibold">
              Employee LeaveSheet Details{" "}
            </h4>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            {leaveSheetData.length > 0 ? (
              <Table striped bordered responsive>
                <thead>
                  <tr className="text-center">
                    <th>Emp Id</th>
                    <th style={{ width: "100px" }}>Emp Name</th>
                    <th style={{ width: "130px" }}>From Date</th>
                    <th style={{ width: "130px" }}>To Date</th>
                    <th style={{ width: "200px" }}>Reason</th>
                    <th style={{ width: "180px" }}>Admin Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveSheetData.map((value: any, index: number) => (
                    <tr key={index} className="text-center">
                      <td>{value.E_Id}</td>
                      <td>{value.E_Name}</td>
                      <td>{value.From_date.split("-").reverse().join("-")} </td>
                      <td>{value.To_date.split("-").reverse().join("-")}</td>
                      <td style={{ width: "250px" }}>{value.reason}</td>
                      <td>{value.Approved}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h1 className="text-center text-3xl p-1 text-blue-800 mb-3">
                Currently there is no leavesheet details in the history
              </h1>
            )}
          </Col>
        </Row>
     
      <Row>
        <Col>
        
        
        </Col>
      </Row>
      </Row>
    </Container>
  );
}

export default UserHistory;
