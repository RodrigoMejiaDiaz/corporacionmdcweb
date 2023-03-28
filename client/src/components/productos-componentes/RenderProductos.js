import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RenderProductos = ({ productosListFiltro, productos }) => {
  return productosListFiltro.map((producto, index) => {
    return (
      <Col md={4} key={index} className="mb-4">
        <Link
          to={`/productos/${producto._id}`}
          state={{ productoslista: productos, producto: producto }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card className="producto-card">
            <Card.Img
              variant="top"
              src={producto.img}
              style={{ height: "200px", width: "auto", objectFit: "contain" }}
            />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  });
};

export default RenderProductos;
