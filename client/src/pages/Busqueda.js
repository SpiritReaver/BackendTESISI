import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Busqueda.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Selecter from "../container/Selecter";
import { Button } from "@mui/material";

export const Busqueda = ({ type }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/Recetas");
  };

  return (
    <div>
      <div className="header">
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          {type !== "list" && (
            <>
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <TextField
                    id="filled-required"
                    label="Selecciona un alimento"
                    variant="outlined"
                  />
                </div>

                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                  <Selecter />
                </div>
                <div className="headerSearchItem">
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    onClick={handleSearch}
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Busqueda;
