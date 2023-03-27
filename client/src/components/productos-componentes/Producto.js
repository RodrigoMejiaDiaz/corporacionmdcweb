import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./Producto.css";

const Producto = () => {
  const [producto, setProducto] = useState([]);

  const { id } = useParams();

  const location = useLocation();

  const productoslista = location.state?.productoslista;

  const [pdf, setPdf] = useState("noMostrarPdf");

  useEffect(() => {
    //Productos
    axios
      .get(`/api/productos/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((err) => {
        console.log("Error from showProductosList");
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
    let url = "https://wa.me/51984709174?text=";

    url += `${encodeURI(msg)}&app_absent=0`;

    window.open(url);
  };

  return (
    <div className="producto">
      {producto === null || producto === undefined ? (
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
          <Container className="container-producto text-center">
            <Row>
              <Col md={10}>
                <Row className="descripcion-producto">
                  <h2
                    style={{
                      borderBottom: "solid 2px ",
                      paddingBottom: "1ch",
                    }}
                  >
                    {producto.nombre}
                  </h2>
                  <p>{producto.desc}</p>
                  <p>Marca: {producto.marca}</p>
                  <p>Categoria: {producto.categoria}</p>
                </Row>
                <Row
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={producto.img}
                    alt={producto.img}
                    style={{
                      boxShadow: "2px 2px 10px",
                    }}
                  />
                </Row>
              </Col>
              <Col md={2} style={{ alignSelf: "center" }}>
                <Button className="btn btn-primary btn-lg" onClick={onSubmit}>
                  Cotizar por Whatsapp
                </Button>
              </Col>
            </Row>
          </Container>
          <Container className="container-pdf text-center">
            <Button onClick={mostrarPDF} style={{ marginTop: "2ch" }}>
              Mostrar Catálogo
            </Button>

            <div className={`pdf-viewer ${pdf}`}>
              <object
                data={
                  "https://storage.googleapis.com/corporacionmdc-imgs/pdfPrueba.pdf"
                }
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Texto Alternativo -{" "}
                  <a href="https://storage.googleapis.com/corporacionmdc-imgs/pdfPrueba.pdf">
                    Abrir PDF
                  </a>
                </p>
              </object>
            </div>
          </Container>
          <h4>Relacionados</h4>
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
        </Container>
      )}
    </div>
  );
};

export default Producto;
