import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.formUser.value;
    const password = event.target.elements.formBasicPassword.value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status === 401) {
      return console.log("Credenciales incorrectas");
    }
    const { token } = await response.json();

    onLogin(token);
  };

  return (
    <Container className="container-login">
      <div className="form-container bg-light d-flex align-items-center justify-content-center">
        <Form onSubmit={handleSubmit} className="p-4 bg-white">
          <h2 className="mb-4">Iniciar sesión</h2>
          <Form.Group controlId="formUser">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="user"
              placeholder="Ingresa tu usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button style={{ marginTop: "20px" }} variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
