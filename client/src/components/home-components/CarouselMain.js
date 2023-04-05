import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselMain.css";
import { Link } from "react-router-dom";

const CarosuelMain = () => {
  const imagenes = [
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/blood-typing_thumb.jpg",
      titulo: "Lab Care",
      desc: "Grupo Sanguíneo",
      link: "productos/642c59d62574e7411c4c66a0",
      categoria: "Dispositivos In vitro",
    },
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/lancetas.jpg",
      titulo: "Sterilance",
      desc: "Lanceta 3 niveles retráctil",
      link: "productos/642c5c0b2574e7411c4c66bc",
      categoria: "Dispositivos Médicos",
    },
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/test.jpg",
      titulo: "Acrobiotech",
      desc: "Pruebas Rápidas HIV/Sífilis",
      link: "productos/642c5278a8a3bae37e035819",
      categoria: "Dispositivos In vitro",
    },
  ];

  return (
    <Carousel className="container-carousel">
      {imagenes.map((imagen, indx) => (
        <Carousel.Item key={indx}>
          <img
            className="carousel-img"
            src={process.env.PUBLIC_URL + imagen.img}
            alt={`slide ${indx}`}
          />
          <div className="white-bg" />
          <div className="bg-text">
            <h3>{imagen.titulo}</h3>
            <p>{imagen.desc}</p>
            <Link
              to={`${imagen.link}?categoria=${imagen.categoria}`}
              style={{ textDecoration: "none" }}
            >
              <button>Leer más</button>
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarosuelMain;
