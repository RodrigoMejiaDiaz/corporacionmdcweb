import "./App.css";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Productos from "./components/productos-componentes/Productos";
import AcercaDe from "./components/AcercaDe";
import Contacto from "./components/Contacto";
import Home from "./components/Home";
import BarraInferior from "./components/BarraInferior";
import Producto from "./components/productos-componentes/Producto";
import Nuevo from "./components/productos-componentes/Nuevo";
import ProductosLista from "./components/productos-componentes/ProductosLista";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    setToken(tokenFromCookie);
  }, []);

  const handleLogin = (token) => {
    Cookies.set("token", token, { expires: 1 });
    setToken(token);
    navigate("/productos/lista");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="App ">
      <header className="App-header">
        <ul className="horizontal-menu-1">
          {token && (
            <li>
              <p
                className="logout"
                onClick={handleLogout}
                style={{ color: "gray", textDecoration: "none" }}
              >
                Cerrar sesion
              </p>
            </li>
          )}
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: "blue",
                      borderRadius: "10px 10px 10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }
                  : {
                      color: "gray",
                      textDecoration: "none",
                    };
              }}
              to="contacto"
            >
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: "blue",
                      borderRadius: "10px 10px 10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }
                  : {
                      color: "gray",
                      textDecoration: "none",
                    };
              }}
              to="acerca"
            >
              Acerca de
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: "blue",
                      borderRadius: "10px 10px 10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }
                  : {
                      color: "gray",
                      textDecoration: "none",
                    };
              }}
              to="productos"
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: "blue",
                      borderRadius: "10px 10px 10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }
                  : {
                      color: "gray",
                      textDecoration: "none",
                    };
              }}
              to="/"
            >
              Inicio
            </NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <img
            src="https://storage.googleapis.com/corporacionmdc-imgs/mdc_logo.png"
            className="App-logo"
            alt="logo"
          />
        </NavLink>
      </header>
      <div className="App-body">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<Producto />} />
          <Route
            path="/productos/nuevo"
            element={token ? <Nuevo /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/productos/nuevo/:id"
            element={token ? <Nuevo /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/productos/lista"
            element={
              token ? <ProductosLista /> : <Navigate to="/login" replace />
            }
          />

          <Route path="/acerca" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/productos/lista" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>

      <BarraInferior token={token} />
    </div>
  );
}

export default App;
