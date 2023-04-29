import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbars from "./components/Header";
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home";
// import Props from "./components/Props";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import "./style.css"
// import { Navbar } from "react-bootstrap";
import Movies from "./components/Movies";
import Tvshow from "./components/Tvshow";
import Detail from "./components/Detail";
import Profile from "./components/Profile";
import Film from "./components/Film";
import Addfilm from "./components/Addfilm";
import Addepisode from "./components/Addepisode";
import Updatefilm from "./components/Updatefilm";
import Pay from "./components/Pay";
import Transaction from "./components/Transaction";
import { useContext, useEffect, useState } from "react";
import * as jose from "jose";
import { UserContext } from "./context/userContext";
import { setAuthToken } from "./config/api";
// import { useState } from "react";
import { API } from './config/api';
// import ProtectedRoute from "./components/ProtectedRoute";
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from "./components/PrivateRoute";




function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === true) {
        // window.location('/Film')
        navigate('/Film');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  
  return (
    <div>
      {/* {isLoading ? null : */}

      <Navbars/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Tvshow" element={<Tvshow />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Detail/:id" element={<Detail />} />
<Route element={<PrivateRouteLogin/>}>
<Route element={<PrivateRouteUser/>}>
        <Route path="/Pay" element={<Pay />} />
        <Route path="/Profile" element={<Profile />} />
</Route>


<Route element={<PrivateRouteAdmin />}>
        <Route path="/Film" element={<Film />} />
        <Route path="/Addfilm" element={<Addfilm />} />
        <Route path="/Addepisode" element={<Addepisode />} />
        <Route path="/Updatefilm/:id" element={<Updatefilm />} />
        <Route path="/Transaction" element={<Transaction />} />

</Route>
</Route>

        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
       
      </Routes>
    
    </div>
  )
}

export default App;

