import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  initialValuesRegistro,
  validationSchemaRegistro,
  onSubmitRegistro,
} from "../../ValidationInicioSesion/formvalidation";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const Registro = () => {
  const paperStyle = {
    padding: "50px ",
    width: 300,
    margin: "0 auto",
    height: "70vh",
  };

  const headerStyle = {
    margin: 0,
  };

  const avatarStyle = {
    backgroundColor: "#23871abf",
  };

  const margField = {
    margin: "8px 0",
  };

  const bottonStyle = {
    width: 300,
    margin: "20px auto",
  };

  return (
    <div>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              {" "}
              <DinnerDiningIcon />
            </Avatar>

            <h2 style={headerStyle}>Registrarse</h2>
            <Typography variant="caption">
              Por favor ingresa estos datos para continuar UwU
            </Typography>
          </Grid>
          <Formik
            initialValues={initialValuesRegistro}
            validationSchema={validationSchemaRegistro}
            onSubmit={onSubmitRegistro}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  name="Nombre"
                  style={margField}
                  variant="outlined"
                  label="Nombre"
                  placeholder="Ingresa tu nombre completo"
                  fullWidth
                  helperText={<ErrorMessage name="Nombre" />}
                />
                <Field
                  as={TextField}
                  name="Telefono"
                  style={margField}
                  variant="outlined"
                  label="Telefono"
                  placeholder="Ingresa tu telefono "
                  fullWidth
                  helperText={<ErrorMessage name="Telefono" />}
                />
                <Field
                  as={TextField}
                  name="Email"
                  style={margField}
                  variant="outlined"
                  label="Email"
                  placeholder="Ingresa tu email "
                  fullWidth
                  helperText={<ErrorMessage name="Email" />}
                />
                <Field
                  as={TextField}
                  name="Contraseña"
                  style={margField}
                  variant="outlined"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  fullWidth
                  helperText={<ErrorMessage name="Contraseña" />}
                />
                <Field
                  as={TextField}
                  name="ConfirmarContraseña"
                  style={margField}
                  variant="outlined"
                  label="Confirmar Contraseña"
                  placeholder="Confirmar contraseña"
                  type="password"
                  fullWidth
                  helperText={<ErrorMessage name="ConfirmarContraseña" />}
                />
                <Button
                  style={bottonStyle}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Cargando" : "Registrarse"}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </div>
  );
};

export default Registro;
