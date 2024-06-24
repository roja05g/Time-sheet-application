import React, { useEffect, useState } from "react";
import fireflinkwhitelogo from "../images/fireflinkwhitelogo-removebg-preview.png";
import adminData from "../admindata.json";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAdminDetails,
  Admin as AdminAction,
} from "./ReduxComponents/adminActionTypes";
import axios from "axios";
import ModelAllComp from "./ModelRegistration";

interface FormData {
  name: string;
  adminId: string;
}
interface AdminJsonData {
  A_Id: string;
  A_Name: string;
  A_Email: string;
}

function AdminLoginPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    adminId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    adminId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [AdminEmail, setAdminEmail] = useState(false);

  const [show, setshow] = useState(false);
  const [message, setmessage] = useState("")
  const [path, setpath] = useState("")

  let checkAdmin = async () => {
    try {
      let response = await axios.get(
        "https://660ef5a4356b87a55c508e86.mockapi.io/Registration"
      );
      response.data.forEach((val: any) => {
        if (val.Email === formData.name) {
          setAdminEmail(true);
        }
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    checkAdmin();
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
        name: "Name is required",
      }));
    }
    if (!formData.adminId.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        adminId: "Admin ID is required",
      }));
    }
  }

  const dispatch = useDispatch();

  const handleRegister = async () => {
    const adminDataType = adminData as { admin: AdminJsonData[] };

    let admin = null;

    for (let i = 0; i < adminDataType.admin.length; i++) {
      const currentAdmin = adminDataType.admin[i];
      if (currentAdmin.A_Id === formData.adminId) {
        admin = currentAdmin;
        const adminData: AdminAction = {
          name: String(currentAdmin.A_Name),
          adminId: String(formData.adminId),
        };
        dispatch(setAdminDetails(adminData));
        setFormData({
          name: "",
          adminId: "",
        });
        break;
      }
    }

    if (admin && AdminEmail) {
      setErrorMessage("");
      setmessage("Admin Sigin Successful")
      setpath("/adminui")
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
            <h2 className="text-2xl font-bold mb-4 text-center mt-6 text-blue-800">
              SIGN IN
            </h2>
            <div className="d-flex justify-center"></div>
            <form onSubmit={handleSubmit} id="employee">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-mail
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
                  htmlFor="adminId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Admin ID
                </label>
                <div className="mt-2">
                  <input
                    id="adminId"
                    name="adminId"
                    type="text"
                    value={formData.adminId}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.adminId && (
                    <p className="text-red-500">{errors.adminId}</p>
                  )}
                </div>
                <div className="text-center mt-3">
                  <p>
                  Don't have an Account? 
                    <Link to={"/"}>
                      <span className="text-blue-800 cursor-pointer font-medium">&nbsp; Register</span>
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
      <ModelAllComp setshow={setshow} show={show} message={message} path={path}/>
    </>
  );
}

export default AdminLoginPage;
