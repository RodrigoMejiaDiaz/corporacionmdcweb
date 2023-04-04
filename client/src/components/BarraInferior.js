import React from "react";
import "./BarraInferior.css";
import { NavLink } from "react-router-dom";
import IgLogo from "../Instagram_Glyph_Gradient.png";

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
          <a
            href="https://www.facebook.com/Corporacionmdcperu"
            target={"_blank"}
            rel="noreferrer"
          >
            <img
              className="logo-socials"
              src={
                "https://storage.googleapis.com/corporacionmdc-imgs/facebook.png"
              }
              alt="facebook logo"
            />
          </a>
          <a
            href="https://www.instagram.com/corp.mdcperu/"
            target={"_blank"}
            rel="noreferrer"
            style={{ marginLeft: "1rem" }}
          >
            <img className="logo-socials" src={IgLogo} alt="instagram logo" />
          </a>
          <ul className="columna-lista">
            <li>
              <NavLink to={"/login"}>
                <label>Corporación MDC Peru S.A.C</label>
              </NavLink>
            </li>
            <label>
              <li>
                Whatsapp: +51{" "}
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://wa.me/51984341057"
                  style={{ color: "white" }}
                >
                  984341057
                </a>
              </li>
              <li>Celular (Sólo llamadas): +51 984770391</li>
            </label>
            <li>
              <label>Teléfono: (054) 585755</label>
            </li>
            <label>
              <li>Correos: cotizaciones@corporacionmdcperu.com</li>
              <li>corporacion.mdc.peru@outlook.com</li>
            </label>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default BarraInferior;
