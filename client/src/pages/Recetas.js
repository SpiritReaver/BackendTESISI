import React, { PureComponent, Fragment } from "react";

import Busqueda from "./Busqueda";

import Sidebarv2 from "../components/Navegacion/Sidebarv2";
import ItemRecetav2 from "../components/ItemRecetas/ItemRecetav2";

export const Recetas = () => {
  return (
    <div>
      <div>
        <div className="flex">
          <Sidebarv2 />
          <div className="content">
            <Busqueda />

            <ItemRecetav2 />
            <ItemRecetav2 />
            <ItemRecetav2 />
            <ItemRecetav2 />
            <ItemRecetav2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recetas;
