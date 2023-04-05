import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Marcas.css";

const Marcas = () => {
  const marcas = [
    "https://storage.googleapis.com/corporacionmdc-imgs/labcare.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/sterilance.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/acrobiotech.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/wiener.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/diagtest.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/awareness.png",
    "https://storage.googleapis.com/corporacionmdc-imgs/basechek.jpg",
  ];
  return (
    <div className="container-marcas azul-borde">
      <h3 className="azul-fondo">Marcas importadas</h3>
      <Container>
        <Row>
          {marcas.map((marca, indx) => (
            <Col key={indx}>
              <img
                className="img-logo"
                src={process.env.PUBLIC_URL + marca}
                alt={marca}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Marcas;
