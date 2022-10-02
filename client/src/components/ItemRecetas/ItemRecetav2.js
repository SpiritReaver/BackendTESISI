import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

import "./ItemReceta.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemRecetav2() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/Recetas/1");
  };

  return (
    <Card className="searchItem" sx={{ maxWidth: 345 }}>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="Arroz con pollo a la española"
      />
      <h4 className="Dieta">Dieta para diabeticos</h4>
      <span className="Calorias">470 calorias </span>
      <CardMedia
        component="img"
        height="194"
        image="https://s1.eestatic.com/2020/01/28/cocinillas/recetas/pasta-y-arroz/arroz-pollo-pasta_y_arroz_463216136_143694761_1024x576.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Pechuga de pollo • Cebolla • Champiñones • Ajo • Apio
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Preparacion:</Typography>

          <Typography paragraph>
            Caliente el aceite de oliva a fuego medio en una olla antiadherente.
            Añada la cebolla, el ajo, el apio, los pimientos rojos o verdes y
            los champiñones. Cocine a fuego medio, revolviendo constantemente
            por 3 minutos o hasta que se ablanden. Añada el arroz integral y
            sofría por 2 a 3 minutos, revolviendo constantemente hasta mezclar
            todos los ingredientes. Añada el pollo, la sal, el caldo de pollo,
            el agua (1 ½ taza), el azafrán o Sazón™ y los tomates. Deje hervir.
            Reduzca el fuego a medio-bajo, tape la cacerola y deje reposar el
            guiso hasta que el agua se absorba y el arroz se ablande, unos 20
            minutos. Agregue y mezcle las arvejas, el maíz y los frijoles;
            cocine por 8 a 10 minutos. Una vez que todo esté caliente, estará
            listo para servir. Adorne con aceitunas o alcaparras, si lo desea.
          </Typography>
          <Button
            variant="contained"
            href="#contained-buttons"
            maxWidth
            onClick={handleSearch}
          >
            Ver mas
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
