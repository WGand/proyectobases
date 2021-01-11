import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "RIF", width: 120 },
  {
    field: "cedula_identidad",
    headerName: "Cédula",
    width: 150,
    type: "number",
  },
  {
    field: "primer_nombre",
    headerName: "Primer nombre",
    width: 150,
  },
  {
    field: "segundo_nombre",
    headerName: "Segundo nombre",
    width: 180,
  },
  {
    field: "primer_apellido",
    headerName: "Primer apellido",
    width: 150,
  },
  {
    field: "segundo_apellido",
    headerName: "Segundo apellido",
    width: 180,
  },
  { field: "correo_electronico", headerName: "Correo electrónico", width: 250 },
];

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = React.useState({});
  const [natural, setNatural] = React.useState([]);

  const datos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/login",
    }).then((response) => {
      setUsuarios(response.data);
    });
  };

  React.useEffect(() => {
    datos();
  }, []);

  React.useEffect(() => {
    if (!usuarios["NATURAL"]) {
      console.log("no existe");
      datos();
    } else {
      console.log("existe");
      setNatural(usuarios["NATURAL"]);
    }
  }, [usuarios]);

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={natural}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
      />
    </div>
  );
}
