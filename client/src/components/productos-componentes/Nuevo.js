import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Col,
  Image,
  Row,
  Toast,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nuevo.css";

const Nuevo = () => {
  // Definición de estados iniciales usando useState
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState("");
  const [img, setImagen] = useState("");
  const [previewImagen, setPreviewImagen] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const producto = location.state?.producto;

  let navigate = useNavigate();

  // hook useEffect que se ejecuta al montar el componente
  useEffect(() => {
    // Petición GET a la API para obtener todas las categorías
    axios
      .get("/api/categorias")
      .then((res) => {
        // Actualiza el estado de categorias con la respuesta de la API
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log("Error from showCategoriaList" + err);
      });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("desc", desc);
      formData.append("marca", marca);
      formData.append("categoria", categoria);
      formData.append("img", img);

      if (producto) {
        // Petición PUT a la API para editar un producto existente
        const response = await axios.put(
          `/api/productos/${producto._id}`,
          formData
        );
        console.log(response.data);
        // Muestra un modal de éxito
        setShowToast(true);
      } else {
        // Petición POST a la API para crear un nuevo producto
        const response = await axios.post("/api/productos", formData);
        console.log(response.data);
        // Muestra un modal de éxito
        setShowToast(true);
        // Redirecciona al usuario a la página de productos después de 1.5 segundos
        setTimeout(() => {
          return navigate("/productos/lista");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de imagen del formulario
  const handleImagenChange = (event) => {
    const imagen = event.target.files[0];
    if (imagen) {
      // Actualiza el estado de imagen
      setImagen(imagen);
      setPreviewImagen(URL.createObjectURL(imagen));
    }
  };

  useEffect(() => {
    //Si hay un producto reemplaza la info
    if (producto) {
      setNombre(producto.nombre);
      setCategoria(producto.categoria);
      setDesc(producto.desc);
      setMarca(producto.marca);
      setImagen(producto.img);
      setPreviewImagen(producto.img);
    }
  }, [producto]);

  return (
    <Container className="container-nuevo-producto">
      <Link to={"/productos/lista"}>
        <Button variant="secondary">Volver a la lista</Button>
      </Link>
      <h2 style={{ textAlign: "center" }}>
        {!producto ? "Nuevo" : "Editar"} producto
      </h2>
      <Row>
        <Form
          onSubmit={handleSubmit}
          as={Col}
          md={8}
          className="formulario-col"
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="categoria">Categoría:</Form.Label>
            <Form.Select
              id="categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.categoria} value={cat.categoria}>
                  {cat.categoria}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="desc">Descripción:</Form.Label>
            <Form.Control
              id="desc"
              value={desc}
              as="textarea"
              rows={6}
              onChange={(event) => setDesc(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="marca">Marca:</Form.Label>
            <Form.Control
              id="marca"
              value={marca}
              as="textarea"
              onChange={(event) => setMarca(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen:</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImagenChange}
              accept="image/*"
            />
          </Form.Group>

          <Button
            variant={!producto ? "success" : "primary"}
            onClick={handleSubmit}
            type="submit"
            style={{ float: "right" }}
          >
            {!producto ? "Crear" : "Editar"} producto
          </Button>
        </Form>

        <Col md={4} className="preview-col">
          <h4>Preview del producto:</h4>
          <p>
            <b>Nombre:</b> {nombre}
          </p>
          <p>
            <b>Categoría:</b>
            {categoria}
          </p>
          <p>
            <b>Descripción:</b> {desc}
          </p>
          <p>
            <b>Marca:</b> {marca}
          </p>
          {previewImagen && (
            <Image src={previewImagen} alt="preview imagen" thumbnail />
          )}
        </Col>
      </Row>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="toast-mediano"
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">
            Producto {!producto ? "creado" : "editado"} exitosamente
          </strong>
        </Toast.Header>
        <Toast.Body>
          <p>
            El producto se ha {!producto ? "creado" : "editado"} exitosamente.
          </p>
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default Nuevo;
