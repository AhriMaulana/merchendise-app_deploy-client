import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/login.module.css';
import { useNavigate } from 'react-router-dom';
import { API, setAuthToken } from '../config/api'
import { UserContext } from "../contex/userContext";
import React, {useState, useContext} from 'react';


function Login() {

  const navigate = useNavigate();
  const [, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const { email, password } = login;

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
  }

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
      const body = JSON.stringify(login)

      // Insert data user for login process here ...
      const response = await API.post('/login', body, config)
      // console.log(response)

      setAuthToken(response.data.data.token);
      // console.log(response.data.data);

      dispatch({
        type: "login",
        payload: response.data.data,
      });

      // Checking process
      // if (response?.status === 200) {

      //   const alert = (
      //     <Alert variant="success" className="py-1">
      //       Login success
      //     </Alert>
      //   );
      //   setMessage(alert);
      // }
    navigate('/Home')
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  const navigasi = useNavigate()
  const handleOut = () => {
    navigasi('/')
  }

  return (
    <div className={style.latar}>
      <div className={style.wadah}>
        <p className={style.login}>Login</p>
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className={style.button}>
            Login
          </Button>
        </Form>
        {message}
        <Button className={style.link} onClick={handleOut}>Don't have an account? Klik Here</Button>
      </div>
    </div>
    
  );
}

export default Login;
