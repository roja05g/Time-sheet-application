import React, { useEffect, useState } from "react";
import userData from "../userdata.json";
import fireflinkwhitelogo from "../images/fireflinkwhitelogo-removebg-preview.png";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserDetails,
  User as UserAction,
} from "./ReduxComponents/userActionTypes";
import axios from "axios";
import ModelAllComp from "./ModelRegistration";

interface FormData {
  name: string;
  empId: string;
}

const UserLoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    empId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    empId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validEmail, setvalidEmail] = useState(false);

  const [show, setshow] = useState(false);
  const [message, setmessage] = useState("");
  const [path, setpath] = useState("");

  console.log("validEmail", validEmail);

  const dispatch = useDispatch();

  let checkEmail = async () => {
    try {
      let response = await axios.get(
        "https://660ef5a4356b87a55c508e86.mockapi.io/Registration"
      );
      response.data.forEach((val: any) => {
        if (val.Email === formData.name) {
          setvalidEmail(true);
        }
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    checkEmail();
  }, [formData.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Email is required",
      }));
    }
    if (!formData.empId.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        empId: "Employee ID is required",
      }));
    }
  };

  const handleRegister = async () => {
    let user = null;
    for (let i = 0; i < userData.users.length; i++) {
      const currentUser = userData.users[i];
      if (currentUser.E_Id === formData.empId) {
        user = currentUser;
        const userData: UserAction = {
          name: String(currentUser.E_Name),
          empId: String(formData.empId),
        };
        dispatch(setUserDetails(userData));
        setFormData({
          name: "",
          empId: "",
        });
        break;
      }
    }

    if (user && validEmail) {
      setErrorMessage("");
      setmessage("Employee Sign in Successful");
      setpath("/userui");
      setshow(true);
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <>
      <div
        className="min-h-screen "
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1249408894/photo/businessman-on-blurred-background-using-digital-screens-interface-with-holograms-datas-3d.webp?b=1&s=170667a&w=0&k=20&c=Z_UN1MgSDotSYMFCgup27ScXOKwY5lTz4VN7es-fbng=')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={fireflinkwhitelogo}
          alt="fireflinkwhitelogo"
          className="h-32 w-1/3"
        />
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-slate-50 bg-opacity-52 rounded-lg shadow-lg p-8 ">
            <h2 className="text-2xl font-bold mb-4 text-center mt-6  text-blue-800">
              SIGN IN
            </h2>
            <div className="d-flex justify-center"></div>
            <form onSubmit={handleSubmit} id="employee">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-Mail
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="email"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor="empId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Employee ID
                </label>
                <div className="mt-2">
                  <input
                    id="empId"
                    name="empId"
                    type="text"
                    value={formData.empId}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.empId && (
                    <p className="text-red-500">{errors.empId}</p>
                  )}
                </div>
                <div className="text-center mt-3">
                  <p>
                    Don't have an Account?
                    <Link to={"/"}>
                      <span className="text-blue-800 cursor-pointer font-medium">
                        &nbsp; Register
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button
                  type="submit"
                  onClick={handleRegister}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModelAllComp
        setshow={setshow}
        show={show}
        message={message}
        path={path}
      />
    </>
  );
};

export default UserLoginPage;
