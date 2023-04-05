import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

import "./Producto.css";
import DetalleProducto from "./DetalleProducto";
import Relacionados from "./Relacionados";

const Producto = () => {
  const location = useLocation();
  const { id } = useParams();
  const [producto, setProducto] = useState(location.state?.producto);
  const [productoslista, setProductosLista] = useState(
    location.state?.productoslista
  );
  const categoria = new URLSearchParams(location.search).get("categoria");
  const [pdf, setPdf] = useState("noMostrarPdf");
  let [veces, setVeces] = useState(0);
  let [veces2, setVeces2] = useState(0);
  useEffect(() => {
    //Productos
    if (!producto && veces <= 0) {
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
          setPdf("noMostrarPdf");
        });
      setVeces(veces++);
    } else if (location.state?.producto) {
      setProducto(location.state.producto);
    }
    // eslint-disable-next-line
  }, [id, veces]);

  useEffect(() => {
    if (categoria && !productoslista && veces2 <= 0) {
      axios
        .get(`/api/productos/categoria/${categoria}`)
        .then((res) => {
          setProductosLista(res.data);
        })
        .catch((err) => {
          console.log("Error from showProductosList" + err);
          setProductosLista(undefined);
        });
      setVeces2(veces2++);
    } else if (!productoslista && !categoria && veces2 <= 0) {
      axios
        .get(`/api/productos`)
        .then((res) => {
          setProductosLista(res.data);
        })
        .catch((err) => {
          console.log("Error from showProductosList" + err);
          setProductosLista(undefined);
        });

      setVeces2(veces2++);
    }
  }, [categoria, productoslista, veces2]);

  //Botón retroceder

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/productos");
  };

  //Botón mostrar u ocultar PDF

  const mostrarPDF = () => {
    pdf === "noMostrarPdf" ? setPdf("") : setPdf("noMostrarPdf");
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
          <Button
            onClick={goBack}
            variant="secondary"
            style={{ marginTop: "0.2rem" }}
          >
            Volver
          </Button>
          <DetalleProducto
            onSubmit={onSubmit}
            producto={producto}
            mostrarPDF={mostrarPDF}
            pdf={pdf}
          />

          <h4 className="azul">Relacionados</h4>
          <Relacionados productoslista={productoslista} producto={producto} />
        </Container>
      )}
    </div>
  );
};

export default Producto;
