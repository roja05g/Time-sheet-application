import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";
import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function AdminTimesheet() {
  const [data, setData] = useState([]);

  const getData = async () => {
    startTransition(() => {
      axios
        .get("https://66064a01d92166b2e3c388ea.mockapi.io/user/user")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          alert(err.message);
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
      className="d-flex h-100 absolute flex justify-content-center align-items-center "
    >
      <Row className=" bg-gradient-to-r from-sky-50 to-yellow-100 m-auto rounded-xl shadow-lg ">
        <Row className="mx-auto mt-3">
          <Col sm={8} md={8} xs={8} className="mx-auto">
            <h4 className="text-center text-3xl font-semibold  text-blue-800">
              Employee TimeSheet Details{" "}
            </h4>
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
                  <th>Sl NO</th>
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
                {copydata.map((value: any, index: number) => (
                  <tr key={index} className="text-center">
                    <td>{value.id}</td>
                    <td>{value.E_Id}</td>
                    <td>{value.E_Name}</td>
                    <td>{reverseDate(value.From_date)} </td>
                    <td>{value.From_time}</td>
                    <td>{value.TO_time}</td>
                    <td>{value.WorkLocation}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {data.length>0 &&
            <Row className="mb-4">
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
                    <li className="page-item rounded-full">
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

export default AdminTimesheet;
