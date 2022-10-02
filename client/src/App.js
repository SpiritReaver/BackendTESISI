import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroContainer from "./container/Container";

import "./App.css";
import ListaCompra from "./pages/ListaCompra";
import Recetas from "./pages/Recetas";
import Busqueda from "./pages/Busqueda";
import Historial from "./pages/Historial";
import ItemReceta from "./components/ItemRecetas/ItemReceta";
import Inicio from "./pages/Inicio";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistroContainer />} />
      </Routes>

      <Routes>
        <Route path="/Busqueda" exact={true} element={<Busqueda />} />
        <Route path="/Inicio" exact={true} element={<Inicio />} />
        <Route path="/Historial" exact={true} element={<Historial />} />
        <Route path="/ListaCompra" exact={true} element={<ListaCompra />} />
        <Route path="/Recetas" exact={true} element={<Recetas />} />
        <Route path="/Recetas/:id" element={<ItemReceta />} />
      </Routes>
    </BrowserRouter>
  );
}
