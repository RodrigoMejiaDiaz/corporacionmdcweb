import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Relacionados({ productoslista, producto }) {
  return (
    <Container className="container-relacionados text-center">
      {productoslista !== undefined
        ? productoslista
            .filter(
              (p) =>
                p.categoria === producto.categoria &&
                p.nombre !== producto.nombre
            )
            .map(
              (p, k) =>
                k < 4 && (
                  <Link
                    to={`/productos/${p._id}`}
                    state={{ productoslista: productoslista }}
                    style={{ textDecoration: "none" }}
                    key={k}
                  >
                    <div className="container-relacionados-card">
                      <h4>{p.nombre}</h4>
                      <img src={p.img} alt={p.img} />
                    </div>
                  </Link>
                )
            )
        : ""}
    </Container>
  );
}

export default Relacionados;
