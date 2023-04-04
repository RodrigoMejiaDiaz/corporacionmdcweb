import React from "react";
import { Link } from "react-router-dom";
import "./ProductosHome.css";

const ProductosHome = () => {
  const items = [
    {
      marca: "Wiener lab",
      categoria: "Bioquimica",
      img: "https://storage.googleapis.com/corporacionmdc-imgs/wienerglucosa.jpg",
    },
    {
      marca: "Diagtest",
      categoria: "Soluciones",
      img: "https://storage.googleapis.com/corporacionmdc-imgs/soluciones.png",
    },
    {
      marca: "Awareness tech",
      categoria: "Equipos de laboratorio",
      img: "https://storage.googleapis.com/corporacionmdc-imgs/equipos-lab.png",
    },
    {
      marca: "CDI",
      categoria: "Dispositivos In vitro",
      img: "https://storage.googleapis.com/corporacionmdc-imgs/in-vitro.png",
    },
  ];
  return (
    <div className="card-container reveal">
      {items.map((item, indx) => (
        <Link
          to={"/productos"}
          key={indx}
          state={{ categoriaActual: item.categoria }}
          style={{ textDecoration: "none" }}
        >
          <div className="card-item">
            <h4>{item.marca}</h4>
            <img src={item.img} alt={item.img} />
            <div className="card-text">
              <p>{item.categoria}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductosHome;
