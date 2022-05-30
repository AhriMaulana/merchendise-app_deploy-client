import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/register.module.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api'
import React, { useState } from "react";


function Register() {

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const { fullname, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Create Configuration Content-type here ...
            // Content-type: application/json
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            // Convert form data to string here ...
            const body = JSON.stringify(form)

            // Insert data user to database here ...
            const response = await API.post('/register', body, config)
            console.log(response);

            // Notification
            if (response.data.status === "success...") {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success, Please click the link below to login
                    </Alert>
                );
                setMessage(alert);
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Please Check Again<br/>
                        Full name, Email and Password<br />
                        must be filled<br />
                        correct email address<br />
                        password min 6 characters
                    </Alert>
                );
                setMessage(alert);
            }

        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    const navigasi = useNavigate()
    const handelLog = () => {
        navigasi("/Login")
    }

    return (
        <div className={style.latar}>
            <div className={style.wadah}>
                <p className={style.login}>Register</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Full Name"
                            name='fullname'
                            value={fullname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className={style.button}>
                        Register
                    </Button>
                </Form>
                {message}
                <Button className={style.link} onClick={handelLog}>Already have an account ? Klik Here</Button>
            </div>
        </div>

    );
}

export default Register;
