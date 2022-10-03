import "./ItemReceta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Sidebarv2 from "../Navegacion/Sidebarv2";
import BootstrapDialogTitle from "../ItemRecetas/Modal/Modal";

const ItemReceta = () => {
  const photos = [
    {
      src: "https://s1.eestatic.com/2020/01/28/cocinillas/recetas/pasta-y-arroz/arroz-pollo-pasta_y_arroz_463216136_143694761_1024x576.jpg",
    },
  ];

  return (
    <div>
      <div className="flex">
        <Sidebarv2 />
        <div className="content">
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <h1 className="hotelTitle">ARROZ CON POLLO A LA ESPAÑOLA </h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Dieta diabetica</span>
              </div>
              <span className="hotelDistance">Ingredientes</span>
              <div className="hotelDetails">
                <span className="hotelPriceHighlight">
                  <ul>Pechuga de pollo • Cebolla • Champiñones • Ajo • Apio</ul>
                </span>
                <div className="hotelImages">
                  {photos.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img src={photo.src} alt="" className="hotelImg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Instrucciones</h1>
                  <p className="hotelDesc">
                    Caliente el aceite de oliva a fuego medio en una olla
                    antiadherente. Añada la cebolla, el ajo, el apio, los
                    pimientos rojos o verdes y los champiñones. Cocine a fuego
                    medio, revolviendo constantemente por 3 minutos o hasta que
                    se ablanden. Añada el arroz integral y sofría por 2 a 3
                    minutos, revolviendo constantemente hasta mezclar todos los
                    ingredientes. Añada el pollo, la sal, el caldo de pollo, el
                    agua (1 ½ taza), el azafrán o Sazón™ y los tomates. Deje
                    hervir. Reduzca el fuego a medio-bajo, tape la cacerola y
                    deje reposar el guiso hasta que el agua se absorba y el
                    arroz se ablande, unos 20 minutos. Agregue y mezcle las
                    arvejas, el maíz y los frijoles; cocine por 8 a 10 minutos.
                    Una vez que todo esté caliente, estará listo para servir.
                    Adorne con aceitunas o alcaparras, si lo desea.
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfecto para 9 porciones</h1>
                  <span>470 calorias</span>
                  <h2>
                    <b>$18000</b> (COP)
                  </h2>
                  <BootstrapDialogTitle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemReceta;
