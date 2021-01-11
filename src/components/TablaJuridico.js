import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "RIF", width: 120 },
  {
    field: "denominacion_comercial",
    headerName: "Denominación comercial",
    width: 250,
  },
  {
    field: "razon_social",
    headerName: "Razón social",
    width: 180,
  },
  { field: "correo_electronico", headerName: "Correo electrónico", width: 250 },
  { field: "pagina_web", headerName: "Página web", width: 250 },
  {
    field: "capital_disponible",
    headerName: "Capital disponible",
    width: 200,
    type: "number",
  },
];

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = React.useState({});
  const [juridico, setJuridico] = React.useState([]);

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
    if (!usuarios["JURIDICO"]) {
      console.log("no existe");
      datos();
    } else {
      console.log("existe");
      setJuridico(usuarios["JURIDICO"]);
    }
  }, [usuarios]);

  console.log(usuarios);

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={juridico}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
      />
    </div>
  );
}
