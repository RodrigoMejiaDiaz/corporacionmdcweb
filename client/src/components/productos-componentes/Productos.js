import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Productos.css";
import { useLocation } from "react-router-dom";
import CategoriasList from "./CategoriasList";
import RenderProductos from "./RenderProductos";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const location = useLocation();

  const [categoriaActual, setCategoriaActual] = useState(
    location.state?.categoriaActual
  );

  //get base de datos Categorias y Productos
  useEffect(() => {
    //Categorias
    axios
      .get("/api/categorias")
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log("Error from showCategoriaList: " + err);
      });
    //Productos
    axios
      .get("/api/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.log("Error from showProductosList: " + err);
      });
  }, []);

  const productosListFiltro = categoriaActual
    ? productos.filter((producto) => producto.categoria === categoriaActual)
    : productos;

  const handleCategoriaClick = (categoria) => {
    setCategoriaActual(categoria);
  };
  return (
    <div className="productos-container">
      <Container>
        <Row>
          <Col md={3}>
            <h3>Categorías</h3>
            <CategoriasList
              handleCategoriaClick={handleCategoriaClick}
              categoriaActual={categoriaActual}
              categorias={categorias}
            />
          </Col>
          <Col md={9}>
            <h3>{categoriaActual ? categoriaActual : "Todos los productos"}</h3>
            <Row>
              <RenderProductos
                productos={productos}
                productosListFiltro={productosListFiltro}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Productos;
