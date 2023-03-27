import React from "react";
import "./BarraInferior.css";
import { NavLink } from "react-router-dom";

const BarraInferior = ({ token }) => {
  return (
    <footer>
      <div className="container-barra">
        <div className="columna">
          <label>Información</label>
          <ul className="columna-lista">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }
                    : {
                        color: "white",
                        textDecoration: "none",
                      };
                }}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="acerca"
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }
                    : {
                        color: "white",
                        textDecoration: "none",
                      };
                }}
              >
                Acerca De
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contacto"
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }
                    : {
                        color: "white",
                        textDecoration: "none",
                      };
                }}
              >
                Contactanos
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="columna">
          <NavLink to={"/acerca"}>
            <label>Acerca De</label>
          </NavLink>
          <ul className="columna-lista"></ul>
        </div>
        <div className="columna">
          <NavLink to={"/productos"}>
            <label>Productos</label>
          </NavLink>
          <ul>
            {token && (
              <NavLink
                to={"/productos/lista"}
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }
                    : {
                        color: "white",
                        textDecoration: "none",
                      };
                }}
              >
                <li>Lista de Productos</li>
              </NavLink>
            )}
          </ul>
        </div>
        <div className="columna">
          <a href="https://www.facebook.com" target={"_blank"} rel="noreferrer">
            <img
              className="logo-socials"
              src={
                "https://storage.googleapis.com/corporacionmdc-imgs/facebook.png"
              }
              alt="facebook logo"
            />
          </a>
          <ul className="columna-lista">
            <li>
              <NavLink to={"/login"}>
                <label>Corporación MDC Peru S.A.C</label>
              </NavLink>
            </li>
            <li>
              <label>
                Whatsapp: +51{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51997569511"
                  style={{ color: "white" }}
                >
                  997569511
                </a>{" "}
                /{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51984709174"
                  style={{ color: "white" }}
                >
                  984709174
                </a>
              </label>
            </li>
            <li>
              <label>Teléfono: (01)401174</label>
            </li>
            <li>
              <label>Correo: </label>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default BarraInferior;
