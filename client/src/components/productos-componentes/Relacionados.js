import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Relacionados = ({ productoslista, producto }) => {
  return (
    <Container className="container-relacionados azul text-center">
      {productoslista !== undefined
        ? productoslista
            .filter(
              (p) =>
                p.categoria === producto.categoria &&
                p.nombre !== producto.nombre
            )
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((p, k) => (
              <Link
                to={`/productos/${p._id}`}
                state={{ productoslista: productoslista, producto: p }}
                style={{ textDecoration: "none" }}
                key={k}
              >
                <div className="container-relacionados-card">
                  <h4 className="azul-fondo">{p.nombre}</h4>
                  <img src={p.img} alt={p.img} />
                </div>
              </Link>
            ))
        : ""}
    </Container>
  );
};

export default Relacionados;
