import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/userContext';
// import { Navigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // const title = 'Login';
  // document.title = 'DumbMerch | ' + title;

  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      // Status check
      if (response.data.data.role === 'admin') {
        navigate('/Film');
      } else {
        navigate('/');
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });
  

  return (
    <div>
      <Button className="" variant="danger" onClick={() => setShowModal(true)}>
        Login
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}> 
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-5" >
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
        <Modal.Footer>
      <Button type="submit"className="loginn" variant="danger" >
        Login
      </Button>
      </Modal.Footer>
          </Form>
        </Modal.Body>
      <Modal.Footer
          className="flex justify-content-center border-0"
          style={{ marginTop: "-25px" }}>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Already have an account ? Klik{" "}
            <a
              onClick={showModal}
              style={{
                textDecoration: "none",
                color: "gray",
                cursor: "pointer",
              }}
              className="fw-semibold">
              Here
            </a>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;