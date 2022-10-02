import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [dieta, setDieta] = React.useState("");

  const handleChange = (event) => {
    setDieta(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Tipo de dieta
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={dieta}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={10}>Dieta para diabeticos</MenuItem>
          <MenuItem value={20}>Dieta Sana</MenuItem>
          <MenuItem value={30}>Dieta Baja en calorias</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
