import { useState, useEffect } from "react";
import axios from "axios";
import {Col, Container, Row, Table} from "react-bootstrap";

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
}

function AdminHistory() {
  const [timeSheetData, setTimeSheetData] = useState<TimeEvent[]>([]);
  const [leaveSheetData, setLeaveSheetData] = useState<LeaveEvent[]>([]);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get<LeaveEvent[]>(
        "https://66082db0a2a5dd477b141c83.mockapi.io/LeaveDetails"
      );
      setLeaveSheetData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  const fetchTimeSheetData = async () => {
    try {
      const response = await axios.get<TimeEvent[]>(
        "https://66064a01d92166b2e3c388ea.mockapi.io/user/user"
      )
      setTimeSheetData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  useEffect(() => {
    fetchLeaveData();
    fetchTimeSheetData();
  }, []);
  
  return (
    <Container
      fluid
      className="d-flex h-100 absolute flex justify-content-center align-items-center "
    >
      <Row className=" bg-gradient-to-r from-sky-50 to-yellow-100 m-auto rounded-xl shadow-lg ">
        <Row className="mx-auto mt-3">
          <Col sm={8} md={8} xs={8} className="mx-auto">
            <h4 className="text-center text-3xl font-semibold text-blue-800">
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
                    <th style={{ width:"100px"}}>Date</th>
                    <th>Login Time</th>
                    <th>Logout Time</th>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h1 className="text-center text-3xl p-1">Currently there is no timesheet details in the history</h1>
            )}
          </Col>
        </Row>

        {/* --------------------------------------------------- */}

        <Row className="mx-auto mt-3">
          <Col sm={8} md={8} xs={8} className="mx-auto">
            <h4 className="text-center text-3xl font-semibold text-blue-800">
              Employee LeavesSheet Details{" "}
            </h4>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            { leaveSheetData.length>0 ? 
            <Table striped bordered responsive>
              <thead>
                <tr className="text-center">
                  <th>Emp Id</th>
                  <th>Emp Name</th>
                  <th style={{ width: "120px" }}>From Date</th>
                  <th style={{ width: "120px" }}>To Date</th>
                  <th style={{ width: "250px" }}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {leaveSheetData.map((value: any, index: number) => (
                  <tr key={index} className="text-center">
                    <td>{value.E_Id}</td>
                    <td>{value.E_Name}</td>
                    <td>{value.From_date.split("-").reverse().join("-")} </td>
                    <td>{value.To_date.split("-").reverse().join("-")}</td>
                    <td>{value.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>:  (
              <h1 className="text-center text-3xl p-1 mb-3">Currently there is no leavesheet details in the history</h1>
            )
            }
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default AdminHistory;
