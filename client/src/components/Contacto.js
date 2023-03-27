import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import "./Contacto.css";

const Contacto = () => {
  const [msg, setMsg] = useState("");

  //Enviar mensaje Whatsapp
  const onSubmit = (e) => {
    e.preventDefault();
    let url = "https://wa.me/51984709174?text=";

    url += `${encodeURI(msg)}&app_absent=0`;

    window.open(url);
  };
  return (
    <>
      <div className="container-contacto">
        <Row>
          <Col className="formulario">
            <h2>Contacto</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  rows={3}
                  as="textarea"
                  placeholder="Introduzca su mensaje"
                />
              </Form.Group>
              <Button type="submit" className="btn-lg">
                Contactar por Whatsapp
              </Button>
            </Form>
          </Col>

          <Col className="container-info">
            <h4>Corporación MDC Peru S.A.C</h4>
            <ul>
              <li>
                Whatsapp: +51{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51997569511"
                  style={{ color: "white" }}
                >
                  997569511
                </a>{" "}
                /{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51984709174"
                  style={{ color: "white" }}
                >
                  984709174
                </a>
              </li>
              <li>Teléfono: (01)401174</li>
              <li>Correo: </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contacto;
