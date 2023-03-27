import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Form,
  FormControl,
  Table,
  Container,
  Button,
  Toast,
} from "react-bootstrap";
import axios from "axios";

import "./ProductosLista.css";
import { Link } from "react-router-dom";

const ProductosLista = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios
      .get("/api/categorias")
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log("Error from showCategoriaList", err);
      });
    axios
      .get("/api/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const productosFiltrados =
    categoriaSeleccionada !== null
      ? productos.filter(
          (producto) => producto.categoria === categoriaSeleccionada
        )
      : productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleEliminarProducto = async (producto) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${producto._id}`);
      console.log("Se ha eliminado el producto");

      // Hacer una nueva petición a la API para obtener la lista actualizada de productos
      const response = await axios.get("http://localhost:5000/api/productos");
      setProductos(response.data);

      setShowToast(true);
    } catch (error) {
      console.log(error);
      console.log("No se puedo eliminar el producto!");
    }
  };

  return (
    <Container style={{ backgroundColor: "aliceblue" }}>
      <h1>Lista de productos</h1>
      <div className="d-flex">
        <div className="w-25">
          <ListGroup>
            <ListGroup.Item
              active={!categoriaSeleccionada}
              onClick={() => handleCategoriaClick(null)}
            >
              Todos los productos
            </ListGroup.Item>
            {categorias.map((categoria) => (
              <ListGroup.Item
                key={categoria._id}
                active={categoriaSeleccionada === categoria.categoria}
                onClick={() => handleCategoriaClick(categoria.categoria)}
              >
                {categoria.categoria}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Link to="/productos/nuevo">
            <Button
              style={{ float: "right", marginTop: "1rem" }}
              variant="success"
            >
              Crear nuevo producto
            </Button>
          </Link>
        </div>
        <div className="w-75">
          <Form className="mb-3">
            <FormControl
              type="text"
              placeholder="Buscar por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.desc}</td>
                  <td>{producto.marca}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    {producto.img && (
                      <img
                        src={producto.img}
                        alt={producto.nombre}
                        height="100"
                      />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/productos/nuevo/${producto._id}`}
                      state={{ producto: producto }}
                    >
                      <Button variant="outline-primary" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminarProducto(producto)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        className="position-fixed bottom-0 end-0 mb-3 me-3"
      >
        <Toast.Body>El producto se eliminó con éxito</Toast.Body>
      </Toast>
    </Container>
  );
};

export default ProductosLista;
