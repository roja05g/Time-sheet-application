import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import ApproveData from "./ApproveData";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function AdminLeaveSheet() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
console.log(isPending);

  const getData = async () => {
    startTransition(() => {
      axios
        .get("https://66082db0a2a5dd477b141c83.mockapi.io/LeaveDetails")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timesheet");
    XLSX.writeFile(wb, "timesheet.xlsx");
  };

  function reverseDate(dateString: string): string {
    return dateString.split("-").reverse().join("-");
  }

  const [currentpage, setcurrentpage] = useState(1);
  const recordsPerpage = 5;
  const lastIndex = currentpage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const copydata = data.slice(firstIndex, lastIndex);
  const nquestions = Math.ceil(data.length / recordsPerpage);
  const numbers = [...Array(nquestions + 1).keys()].slice(1);

  return (
    <Container
      fluid
      className="d-flex h-100 flex justify-content-center align-items-center "
    >
      <Row className="custom-width  bg-gradient-to-r from-sky-50 to-yellow-100 m-auto rounded-xl shadow-lg ">
        <Row className="mx-auto mt-3">
          <Col sm={11} md={8} xs={11} className="mx-auto">
            <h1 className="text-center text-2xl font-semibold  text-blue-800">
              Employee LeaveSheet Details{" "}
            </h1>
          </Col>
          <Col className="flex justify-end align-items-end">
            <Button
              variant="contained"
              endIcon={<ArrowDownwardIcon />}
              onClick={exportToExcel}
            >
              Download
            </Button>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            <Table striped bordered responsive>
              <thead>
                <tr className="text-center">
                  <th>Sl No</th>
                  <th>Emp Id</th>
                  <th>Emp Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Reason</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {copydata.map((value: any, index: number) => (
                  <tr key={index} className="text-center">
                    <td>{value.id}</td>
                    <td>{value.E_Id}</td>
                    <td>{value.E_Name}</td>
                    <td style={{ width: "200px" }}>{reverseDate(value.From_date)}</td>
                    <td style={{ width: "200px" }}>{reverseDate(value.To_date)}</td>
                    <td style={{ width: "250px" }}>{value.reason}</td>
                    <td>
                      <ApproveData />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            {data.length>0 &&
            <Row className="mb-3">
              <Col>
                <nav className=" d-flex justify-content-md-center align-items-center mt-3">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link to=" " className="page-link mx-1 rounded-circle px-1.5" onClick={prePage}>
                      <KeyboardArrowLeftIcon/>
                      </Link>
                    </li>
                    {numbers.map((n, i) => (
                      <li
                        className={`page-item ${
                          currentpage === n ? "active" : " "
                        }`}
                        key={i}
                      >
                        <Link
                          to=" "
                          className="page-link mx-1 rounded-full"
                          onClick={() => {
                            changeCpage(n);
                          }}
                        >
                          {n}
                        </Link>
                      </li>
                    ))}
                    <li className="page-item ">
                      <Link to=" " className="page-link mx-1 rounded-circle px-1.5 " onClick={nextPage}>
                        <KeyboardArrowRightIcon/>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </Col>
            </Row>}

          </Col>
        </Row>
      </Row>
    </Container>
  );
  function prePage() {
    if (currentpage !== firstIndex) {
      setcurrentpage(currentpage - 1);
    }
  }
  function changeCpage(id: any) {
    setcurrentpage(id);
  }
  function nextPage() {
    if (currentpage !== lastIndex) {
      setcurrentpage(currentpage + 1);
    }
  }
}

export default AdminLeaveSheet;
