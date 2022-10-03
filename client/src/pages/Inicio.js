import React from "react";

import Busqueda from "./Busqueda";
import Sidebarv2 from "../components/Navegacion/Sidebarv2";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Inicio.css";

export const Inicio = () => {
  const TextStyle = {
    TextAligne: "center",
  };
  return (
    <div>
      <div>
        <div className="flex">
          <Sidebarv2 />
          <div className="content">
            <Busqueda />
            <h1 className="texto">Bienvenido a BogoFood</h1>
            <p></p>
            <h3 className="texto2">La app que te cuida</h3>
            <h5 className="texto">
              A continuación encontrarás los pasos a seguir para usar nuestra
              aplicación
            </h5>
            <Card
              sx={{
                maxWidth: 400,
                marginLeft: "100px",
                marginTop: "60px",
                height: "400px",
                display: "inline-block",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://i1.sndcdn.com/avatars-su5uVQA9xxUFdBwp-E3wzyg-t240x240.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Paso #1: Usa el buscador ubicado en la parte superior para
                  encontrar la receta que mejor se acomode a tus gustos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este buscador te permitirá buscar recetas filtrando las
                  comidas que más te gusten y el tipo de dieta que quieras usar,
                  tu escoges la receta que mejor se ajuste a tus gustos y tu
                  bolsillo
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" color="primary">
                  Llevame ahí
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                maxWidth: 400,
                marginLeft: "100px",
                marginTop: "60px",
                height: "400px",
                display: "inline-block",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://i1.sndcdn.com/avatars-su5uVQA9xxUFdBwp-E3wzyg-t240x240.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Paso #2: Selecciona las recetas que mas te gusten y agregalas
                  a la lista de compra
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Luego de buscar las recetas que mas te llamen la atención
                  podrás ver la información completa de cada una de ellas como
                  sus ingredientes, su preparación, el número de calorias y el
                  precio total de las mismas, cuando encuentres una que te guste
                  la podrás seleccionar a la lista de compras
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                maxWidth: 400,
                marginLeft: "100px",
                marginTop: "60px",
                height: "400px",
                display: "inline-block",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://i1.sndcdn.com/avatars-su5uVQA9xxUFdBwp-E3wzyg-t240x240.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Paso #3: Lleva tus recetas a en tu celular para realizar tu
                  mercado sin necesidad de conexion a internet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Podrás ver la lista con el total de alimentos escogidos y un
                  aproximado de cuanto costará cada producto en tu proxima
                  compra
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
