import { Button } from "@mui/material";
import axios from "axios";
import { startTransition, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModelAllComp from "./ModelRegistration";
import PersonIcon from "@mui/icons-material/Person";

function Registration() {
  const [registerdata, setregisterdata] = useState({
    name: "",
    Email: "",
    confirm_password: "",
    password: "",
  });

  const [show, setshow] = useState(false);
  const [message, setmessage] = useState("");
  const [path, setpath] = useState("");

  const [Error_Name, setError_Name] = useState("");
  const [Error_Email, setError_Email] = useState("");
  const [Error_password, setError_password] = useState("");
  const [Error_confirm_password, setError_confirm_password] = useState("");

  let checkname = () => {
    let rizex = /^[a-zA-Z]{2,100}$/;
    if (registerdata.name) {
      if (rizex.test(registerdata.name)) {
        setError_Name("");
        return true;
      } else {
        setError_Name("Invalid Name");
      }
    } else {
      setError_Name("Required Name");
    }
  };

  let checkemail = () => {
    let rizex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (registerdata.Email) {
      if (rizex.test(registerdata.Email)) {
        setError_Email("");
        return true;
      } else {
        setError_Email("Invalid Email");
      }
    } else {
      setError_Email("Required Email");
    }
  };

  let checkpassword = () => {
    let rizex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (registerdata.password) {
      if (rizex.test(registerdata.password)) {
        setError_password("");
        return true;
      } else {
        setError_password("Invalid Password");
      }
    } else {
      setError_password("Required Password");
    }
  };

  let checkConfirmPassword = () => {
    if (registerdata.confirm_password) {
      if (registerdata.confirm_password === registerdata.password) {
        setError_confirm_password("");
        return true;
      } else {
        setError_confirm_password("Invalid confirm_password");
      }
    } else {
      setError_confirm_password("Required confirm_password");
    }
  };

  let checkuserdata = async () => {
    try {
      let response = await axios.get(
        "https://660ef5a4356b87a55c508e86.mockapi.io/Registration"
      );
      let myFlag = false;
      response.data.forEach((val: any) => {
        if (val.Email === registerdata.Email) {
          myFlag = true;
        }
      });
      if (myFlag) {
        setmessage("Already Exist ");
        setpath("welcome");
        setshow(true);
      } else {
        validateAll();
      }
    } catch (error: any) {
      setshow(true);
      setmessage(error.message);
    }
  };

  let validateAll = async () => {
    checkname();
    checkemail();
    checkpassword();
    checkConfirmPassword();

    if (
      checkname() &&
      checkemail() &&
      checkpassword() &&
      checkConfirmPassword()
    ) {
      startTransition(() => {
        axios
          .post(
            "https://660ef5a4356b87a55c508e86.mockapi.io/Registration",
            registerdata
          )
          .then(() => {
            setmessage("Registration Successful");
            setpath("welcome");
            setshow(true);
            setregisterdata({
              name: "",
              Email: "",
              confirm_password: "",
              password: "",
            });
          })
          .catch((error) => {
            setshow(true);
            setmessage(error.message);
          });
      });
    }
  };

  return (
    <Container
      fluid
      className="d-flex h-100 absolute justify-content-center align-items-center bg-gradient-to-r from-sky-100 to-pink-200"
    >
      <Row className="w-2/5 rounded-xl shadow-lg backdrop-opacity-10 backdrop-invert  bg-gradient-to-r from-yellow-100 to-sky-100">
        <Row className="mx-auto mt-3">
          <Col sm={12} md={12} xs={12} className="mx-auto">
            <h1 className="text-center text-3xl font-semibold  text-blue-800">
              Registration
            </h1>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col sm={12} md={12} xs={12} className="mx-auto text-center">
            <PersonIcon sx={{ fontSize: 60 }} className="text-blue-800" />
          </Col>
        </Row>
        <Row className="mx-auto mt-3 ">
          <Col className="flex flex-col align-items-center">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              className="w-75"
              name="name"
              value={registerdata.name}
              onChange={(e) => {
                setregisterdata({ ...registerdata, name: e.target.value });
              }}
            />
            {Error_Name && <p className="text-red-600 ">{Error_Name}</p>}
          </Col>
        </Row>
        <Row className="mx-auto mt-7 ">
          <Col className="flex flex-col align-items-center">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              className="w-75"
              name="Email"
              value={registerdata.Email}
              onChange={(e) => {
                setregisterdata({ ...registerdata, Email: e.target.value });
              }}
            />
            {Error_Email && <p className="text-red-600 ">{Error_Email}</p>}
          </Col>
        </Row>
        <Row className="mx-auto mt-7 ">
          <Col className="flex flex-col align-items-center">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              className="w-75"
              name="password"
              value={registerdata.password}
              onChange={(e) => {
                setregisterdata({ ...registerdata, password: e.target.value });
              }}
            />
            {Error_password && (
              <p className="text-red-600 ">{Error_password}</p>
            )}
          </Col>
        </Row>
        <Row className="mx-auto mt-7 ">
          <Col className="flex flex-col align-items-center">
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              className="w-75"
              name="confirm_password"
              value={registerdata.confirm_password}
              onChange={(e) => {
                setregisterdata({
                  ...registerdata,
                  confirm_password: e.target.value,
                });
              }}
            />
            {Error_confirm_password && (
              <p className="text-red-600 ">{Error_confirm_password}</p>
            )}
          </Col>
        </Row>
        <Row className="mx-auto mt-2">
          <Col className="text-center">
            <p>
              Already have an Account?{" "}
              <Link to={"welcome"}>
                <span className="text-sky-700 cursor-pointer">Login</span>
              </Link>
            </p>
          </Col>
        </Row>
        <Row className="mx-auto mt-4 mb-4">
          <Col className="text-center">
            <Button variant="contained" onClick={checkuserdata}>
              Submit
            </Button>
          </Col>
        </Row>
      </Row>
      <Row>
        <ModelAllComp
          setshow={setshow}
          show={show}
          message={message}
          path={path}
        />
      </Row>
    </Container>
  );
}

export default Registration;
