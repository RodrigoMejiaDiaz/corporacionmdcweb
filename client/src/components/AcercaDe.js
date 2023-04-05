import React, { Component } from "react";
import "./AcercaDe.css";
import Marcas from "./home-components/Marcas";
import { Col, Row } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export class AcercaDe extends Component {
  render() {
    return (
      <div className="acerca-de">
        <Fade cascade>
          <div className="container-acerca">
            <h2 className="azul">La compañía</h2>
            <div className="container-bloque-empresa">
              <Row>
                <Col md="6">
                  <p>
                    Corporación MDC, una empresa dedicada a la importación y
                    venta de equipos y material para laboratorio y médico.
                    Nuestros productos incluyen pruebas rápidas, equipo para
                    procesar sangre, lancetas, soluciones de laboratorio y mucho
                    más. Trabajamos con marcas de renombre como Labcare,
                    Basecheck, Awareness Technology, AcroBiotech y Wiener lab
                    para asegurarnos de ofrecer la mejor calidad a nuestros
                    clientes.
                  </p>
                  <hr />
                  <p>
                    Nos enfocamos en satisfacer las necesidades de clínicas,
                    hospitales y otras instituciones médicas, ofreciendo precios
                    competitivos y atención personalizada. Si busca productos de
                    alta calidad y un servicio excepcional, no dude en ponerse
                    en contacto con nosotros.
                  </p>
                </Col>
                <Col md="6">
                  <img
                    className="img-empresa"
                    src={
                      "https://storage.googleapis.com/corporacionmdc-imgs/lancetas.jpg"
                    }
                    alt="imagen-empresa"
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="container-bloque-marcas">
            <Marcas />
          </div>
          <div className="container-acerca">
            <h2 className="azul">Certificaciones</h2>
            <p>
              Contamos con sedes en Arequipa y Cuzco y nos enorgullecemos de
              tener los certificados de{" "}
              <b>Buenas Prácticas de Almacenamiento (BPA) </b> y
              <b> Buenas Prácticas de Distribución y Transporte (BPDT), </b>
              lo que garantiza que nuestros productos siempre se manejen y
              almacenen adecuadamente para mantener su calidad y eficacia.
            </p>
            <img
              className="logos"
              src={"https://storage.googleapis.com/corporacionmdc-imgs/bpa.png"}
              alt="img bpa"
            />
            <img
              className="logos"
              src={
                "https://storage.googleapis.com/corporacionmdc-imgs/BPDT.png"
              }
              alt="img bpdt"
            />
          </div>
        </Fade>
      </div>
    );
  }
}

export default AcercaDe;
