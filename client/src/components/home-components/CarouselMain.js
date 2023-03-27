import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselMain.css";

const CarosuelMain = () => {
  const imagenes = [
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/blood-typing_thumb.jpg",
      titulo: "Lab Care",
      desc: "Grupo Sanguíneo",
    },
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/lancetas.jpg",
      titulo: "Sterilance",
      desc: "Lanceta 3 niveles retráctil",
    },
    {
      img: "https://storage.googleapis.com/corporacionmdc-imgs/test.jpg",
      titulo: "Acrobiotech",
      desc: "Pruebas Rápidas Covid-19",
    },
  ];

  function handlerButton() {
    console.log("Leer más");
  }

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
            <button onClick={handlerButton}>Leer más</button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarosuelMain;
