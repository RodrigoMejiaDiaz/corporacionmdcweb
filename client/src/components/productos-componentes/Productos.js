import React, { useEffect, useState } from "react";

import axios from "axios";

import "./Productos.css";
import { Link, useLocation } from "react-router-dom";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const location = useLocation();

  const [categoriaActual, setCategoriaActual] = useState(
    location.state?.categoriaActual
  );

  //get base de datos Categorias y Productos
  useEffect(() => {
    //Categorias
    axios
      .get("/api/categorias")
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log("Error from showCategoriaList");
      });
    //Productos
    axios
      .get("/api/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.log("Error from showProductosList");
      });
  }, []);

  const categoriaList =
    categorias.length === 0
      ? "Cargando..."
      : categorias.map((categoria, k) =>
          categoriaActual === categoria.categoria ? (
            <li
              onClick={() => {
                setCategoriaActual(categoria.categoria);
              }}
              key={k}
              style={{ fontWeight: "bolder" }}
            >
              {categoria.categoria}
            </li>
          ) : (
            <li
              onClick={() => {
                setCategoriaActual(categoria.categoria);
              }}
              key={k}
            >
              {categoria.categoria}
            </li>
          )
        );

  const productosList =
    productos.length === 0
      ? "Cargando..."
      : productos.map((producto, k) => (
          <Link
            to={`/productos/${producto._id}`}
            state={{ productoslista: productos }}
            key={k}
          >
            <div className="card-producto" key={k}>
              <img
                src={process.env.PUBLIC_URL + producto.img}
                alt={producto.img}
              />
              <label>{producto.nombre}</label>
            </div>
          </Link>
        ));

  const productosListFiltro =
    categoriaActual !== undefined
      ? productos.map((producto, k) =>
          producto.categoria === categoriaActual ? (
            <Link
              to={`/productos/${producto._id}`}
              state={{ productoslista: productos }}
              key={k}
            >
              <div className="card-producto">
                <img
                  src={process.env.PUBLIC_URL + producto.img}
                  alt="producto-img"
                />
                <label>{producto.nombre}</label>
              </div>
            </Link>
          ) : (
            ""
          )
        )
      : productosList;

  return (
    <div className="container-productos-main">
      <div className="container-productos-lateral">
        <h3 onClick={() => setCategoriaActual(undefined)}>Categorías</h3>
        <dl>{categoriaList}</dl>

        <dl>
          <li onClick={() => setCategoriaActual(undefined)}>Mostrar todos</li>
        </dl>
      </div>
      <div className="container-productos-productos">
        <h4>{categoriaActual === undefined ? "Productos" : categoriaActual}</h4>
        <div className="container-cards">{productosListFiltro}</div>
      </div>
    </div>
  );
};

export default Productos;
