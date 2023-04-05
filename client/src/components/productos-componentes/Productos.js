import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, FormControl } from "react-bootstrap";
import "./Productos.css";
import { useLocation } from "react-router-dom";
import CategoriasList from "./CategoriasList";
import RenderProductos from "./RenderProductos";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const location = useLocation();

  const [categoriaActual, setCategoriaActual] = useState(
    location.state?.categoriaActual
  );
  let [veces, setVeces] = useState(0);

  //get base de datos Categorias y Productos
  useEffect(() => {
    if (veces <= 0) {
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
      setVeces(veces++);
    }
  }, [veces]);

  const productosListFiltro = categoriaActual
    ? productos
        .filter(
          (producto) =>
            producto.categoria === categoriaActual &&
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
    : productos
        .filter((producto) =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
        .sort((a, b) => a.nombre.localeCompare(b.nombre));

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
            <Form className="mb-3">
              <FormControl
                type="text"
                placeholder="Buscar por nombre"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Form>
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
