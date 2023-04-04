import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import "./Contacto.css";

const Contacto = () => {
  const [msg, setMsg] = useState("");

  //Enviar mensaje Whatsapp
  const onSubmit = (e) => {
    e.preventDefault();
    let url = "https://wa.me/51984341057?text=";

    url += `${encodeURI(msg)}&app_absent=0`;

    window.open(url);
  };
  return (
    <>
      <div className="container-contacto">
        <Row>
          <Col className="formulario" style={{ margin: "10% 0" }}>
            <h2>Contacto</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  rows={5}
                  as="textarea"
                  placeholder="Introduzca su mensaje"
                />
              </Form.Group>
              <Button type="submit" className="btn-lg">
                Contactar por Whatsapp
              </Button>
            </Form>
          </Col>

          <Col className="container-info" style={{ margin: "10% 0" }}>
            <h4>Corporación MDC Peru S.A.C</h4>
            <ul>
              <li>
                Whatsapp: +51{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51984341057"
                  style={{ color: "white" }}
                >
                  984341057
                </a>
              </li>
              <li>Celular (Sólo llamadas): +51 984770391</li>
              <li>Teléfono: (054) 585755</li>
              <li>
                Correos: cotizaciones@corporacionmdcperu.com /{" "}
                corporacion.mdc.peru@outlook.com
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contacto;
