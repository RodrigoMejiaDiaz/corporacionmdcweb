import React from "react";
import { Fade } from "react-awesome-reveal";
import CarouselMain from "./home-components/CarouselMain";
import Marcas from "./home-components/Marcas";
import ProductosHome from "./home-components/ProductosHome";
import "./Home.css";

const Home = () => {
  return (
    <>
      <CarouselMain />
      <div className="container-home">
        <Fade cascade damping={0.1}>
          <Marcas />
          <ProductosHome />
        </Fade>
      </div>
    </>
  );
};

export default Home;
