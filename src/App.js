import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from './page/login';
import Register from "./page/register";
import Home from "./page/home";
import Formedit from "./components/editpage";
import { API } from './config/api'
import React, { useEffect, useContext } from "react";
import { UserContext } from "../src/contex/userContext";


function App() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    // useEffect(() => {
    //     if (localStorage.token) {
    //         setAuthToken(localStorage.token);
    //     } else {
    //         navigate('/')
    //     }
    // }, [state]);

    const checkUser = async () => {
        try {
            const response = await API.get("/checkAuth");

            if (response.status === 404) {
                return dispatch({
                    type: "failed",
                });
            }

            let payload = response.data.data.user;
            payload.token = localStorage.token;

            // Send data to useContext
            dispatch({
                type: "success",
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     checkUser();
    // }, []);
    return (

        <Routes>
            <Route exact path="/" element={<Register />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/edit/:id" element={<Formedit/>} />
        </Routes>

    );
}

export default App;