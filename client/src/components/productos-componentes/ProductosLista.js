import React, { useEffect, useState } from "react";
import {
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
import CategoriasList from "./CategoriasList";

const ProductosLista = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [showToast, setShowToast] = useState(false);
  let [veces, setVeces] = useState(0);
  useEffect(() => {
    if (veces <= 0) {
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
      setVeces(veces++);
    }
  }, [veces]);

  const productosFiltrados =
    categoriaActual !== null
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

  const handleEliminarProducto = async (producto) => {
    try {
      await axios.delete(`/api/productos/${producto._id}`);
      console.log("Se ha eliminado el producto");

      // Hacer una nueva petición a la API para obtener la lista actualizada de productos
      const response = await axios.get("/api/productos");
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
          <CategoriasList
            categoriaActual={categoriaActual}
            categorias={categorias}
            handleCategoriaClick={handleCategoriaClick}
          />
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
                  <td>{producto.desc.slice(0, 200)}...</td>
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
