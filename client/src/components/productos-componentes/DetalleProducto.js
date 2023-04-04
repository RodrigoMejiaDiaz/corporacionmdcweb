import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const DetalleProducto = ({ producto, onSubmit, mostrarPDF, pdf }) => {
  return (
    <>
      <Container className="container-producto text-center">
        <Row>
          <Col md={10}>
            <Row className="descripcion-producto">
              <h2
                style={{
                  borderBottom: "solid 2px ",
                  paddingBottom: "1ch",
                }}
              >
                {producto.nombre}
              </h2>
              <p>{producto.desc}</p>
              <p>Marca: {producto.marca}</p>
              <p>Categoria: {producto.categoria}</p>
            </Row>
            <Row
              style={{
                justifyContent: "center",
              }}
            >
              <img
                src={producto.img}
                alt={producto.img}
                style={{
                  boxShadow: "2px 2px 10px",
                }}
              />
            </Row>
          </Col>
          <Col md={2} style={{ alignSelf: "center" }}>
            <Button className="btn btn-primary btn-lg" onClick={onSubmit}>
              Cotizar por Whatsapp
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="container-pdf text-center">
        <Button onClick={mostrarPDF} style={{ marginTop: "2ch" }}>
          Mostrar Catálogo
        </Button>

        <div className={`pdf-viewer ${pdf}`}>
          <object
            data={producto.pdf}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Texto Alternativo - <a href={producto.pdf}>Abrir PDF</a>
            </p>
          </object>
        </div>
      </Container>
    </>
  );
};

export default DetalleProducto;
