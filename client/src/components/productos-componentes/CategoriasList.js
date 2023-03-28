import React from "react";
import { ListGroup } from "react-bootstrap";

const CategoriasList = ({
  categoriaActual,
  categorias,
  handleCategoriaClick,
}) => {
  return (
    <ListGroup>
      <ListGroup.Item
        active={!categoriaActual}
        onClick={() => handleCategoriaClick(null)}
      >
        Todos los productos
      </ListGroup.Item>
      {categorias.map((categoria) => (
        <ListGroup.Item
          key={categoria._id}
          active={categoriaActual === categoria.categoria}
          onClick={() => handleCategoriaClick(categoria.categoria)}
        >
          {categoria.categoria}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategoriasList;
