import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

import "./Producto.css";
import DetalleProducto from "./DetalleProducto";
import Relacionados from "./Relacionados";

const Producto = () => {
  const { id } = useParams();

  const location = useLocation();

  const productoslista = location.state?.productoslista;
  const [producto, setProducto] = useState(location.state?.producto);

  const [pdf, setPdf] = useState("noMostrarPdf");

  useEffect(() => {
    //Productos
    axios
      .get(`/api/productos/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((err) => {
        console.log("Error from showProductosList" + err);
        setProducto(undefined);
      })
      .then(() => {
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Botón retroceder

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/productos");
  };

  //Botón mostrar u ocultar PDF

  const mostrarPDF = () => {
    pdf === "noMostrarPdf" ? setPdf("mostrarPdf") : setPdf("noMostrarPdf");
  };

  //Enviar mensaje Whatsapp
  const onSubmit = (e) => {
    e.preventDefault();
    let msg = `Hola, me gustaría cotizar el producto: ${producto.nombre}, de la marca: ${producto.marca}, que se encuentra en su página web.`;
    let url = "https://wa.me/51984341057?text=";

    url += `${encodeURI(msg)}&app_absent=0`;

    window.open(url);
  };

  return (
    <div className="producto">
      {!producto ? (
        <>
          <Button onClick={goBack}>Volver</Button>
          <h1 style={{ backgroundColor: "aliceblue" }}>
            No se ha encontrado el producto!
          </h1>
        </>
      ) : producto.length === 0 ? (
        "Cargando..."
      ) : (
        <Container fluid="md" style={{ backgroundColor: "aliceblue" }}>
          <Button onClick={goBack} variant="link" className="btn-volver">
            Volver
          </Button>
          <DetalleProducto
            onSubmit={onSubmit}
            producto={producto}
            mostrarPDF={mostrarPDF}
            pdf={pdf}
          />

          <h4>Relacionados</h4>
          <Relacionados productoslista={productoslista} producto={producto} />
        </Container>
      )}
    </div>
  );
};

export default Producto;
