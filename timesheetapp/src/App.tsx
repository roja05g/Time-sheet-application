import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WelCome from "./components/WelCome";
import AdminLoginPage from "./components/AdminLoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLoginPage from "./components/UserLoginPage";
import UserUI from "./components/UserUI";
import AdminUi from "./components/AdminUi";
import { useEffect } from "react";
import Registration from "./components/Registration";

function App() {
  useEffect(() => {
    const isRefreshed = performance.navigation.type === performance.navigation.TYPE_RELOAD;
    if (isRefreshed) {
      window.location.replace("/"); 
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="welcome" element={<WelCome />}></Route>
          <Route path="register" element={<UserLoginPage />}>
          </Route>
          <Route path="userui" element={<UserUI />}></Route>
          <Route path="admincomp" element={<AdminLoginPage />}></Route>
          <Route path="adminui" element={<AdminUi />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
