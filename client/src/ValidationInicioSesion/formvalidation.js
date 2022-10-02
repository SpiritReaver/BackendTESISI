import * as Yup from "yup";
//validacion login
export const validationSchemaLogin = Yup.object().shape({
  Usuario: Yup.string()
    .email("Ingresa un correo valido")
    .required("Obligatorio"),
  Contraseña: Yup.string().required("Obligatorio"),
});

export const onSubmitLogin = (values, props) => {
  ////Aca imprimo los datos que esta tomando
  console.log(values);
  setTimeout(() => {
    props.resetForm();
    props.setSubmitting(false);
  }, 2000);

  console.log(props);
};

export const initialValuesLogin = {
  Usuario: "",
  Contraseña: "",
  Recuerdame: false,
};

//validacion registro
export const initialValuesRegistro = {
  Nombre: "",
  Telefono: "",
  Email: "",
  Contraseña: "",
  ConfirmarContraseña: "",
};

export const validationSchemaRegistro = Yup.object().shape({
  Nombre: Yup.string().min(3, "Demasiado corto").required("Obligatorio"),
  Telefono: Yup.number()
    .typeError("Ingresa un telefono valido")
    .required("Obligatorio"),
  Email: Yup.string().email("Ingresa un correo valido").required("Obligatorio"),
  Contraseña: Yup.string()
    .min(8, "El tamaño minimo de la contraseña debe ser 8 caracteres")
    .required("Obligatorio"),
  ConfirmarContraseña: Yup.string()
    .oneOf([Yup.ref("Contraseña")], "Las contraseñas no coinciden")
    .required("Obligatorio"),
});

export const onSubmitRegistro = (values, props) => {
  //Aca imprimo los datos que esta tomando
  console.log(values);
  console.log(props);
  setTimeout(() => {
    props.resetForm();
    props.setSubmitting(false);
  }, 2000);
};
