import {
  Paper,
  Grid,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {
  validationSchemaLogin,
  onSubmitLogin,
  initialValuesLogin,
} from "../../ValidationInicioSesion/formvalidation";

const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 50,
    height: "70vh",
    width: 300,
    margin: "0 auto",
  };

  const avatarStyle = {
    backgroundColor: "#23871abf",
  };

  const btnstyle = {
    margin: "8px 0",
  };

  const margField = {
    margin: "8px 0",
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <DinnerDiningIcon />
          </Avatar>
          <h2>Iniciar Sesión</h2>
        </Grid>

        <Formik
          initialValues={initialValuesLogin}
          onSubmit={onSubmitLogin}
          validationSchema={validationSchemaLogin}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                style={margField}
                name="Usuario"
                variant="outlined"
                label="Usuario"
                placeholder="Ingresa tu usuario o correo "
                fullWidth
                helperText={<ErrorMessage name="Usuario" />}
              />
              <Field
                as={TextField}
                style={margField}
                name="Contraseña"
                variant="outlined"
                label="Contraseña"
                placeholder="Ingresa tu usuario o correo "
                type="password"
                fullWidth
                helperText={<ErrorMessage name="Contraseña" />}
              />
              <Field
                name="Recuerdame"
                as={FormControlLabel}
                control={<Checkbox name="checkedB" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Cargando" : "Registrarse"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Olvidé la contraseña</Link>
        </Typography>
        <Typography>
          {" "}
          ¿Ya tienes una cuenta?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Registrate
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
