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

export default function TablaJuridico(props) {
  const [usuarios, setUsuarios] = React.useState({});
  const [juridico, setJuridico] = React.useState([]);
  const [juridicoSelec, setJuridicoSelec] = React.useState({});
  const [cargando, setCargando] = React.useState(false);

  const datos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/login",
    }).then((response) => {
      setUsuarios(response.data);
    });
  };

  const conseguirDatos = () => {
    props.juridicoSelec(juridicoSelec);
  };

  const juridicoSeleccionado = (event) => {
    setJuridicoSelec(event.data);
  };

  React.useEffect(() => {
    datos();
  }, []);

  React.useEffect(() => {
    if (!usuarios["JURIDICO"]) {
      console.log("no existe");
      setCargando(true);
      datos();
    } else {
      console.log("existe");
      let aux = usuarios["JURIDICO"].filter(
        (proveedor) => proveedor.rubro === null
      );
      setJuridico(aux);
      setCargando(false);
    }
  }, [usuarios]);

  React.useEffect(() => {
    conseguirDatos();
  }, [juridicoSelec]);

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={juridico}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
        onRowSelected={juridicoSeleccionado}
        loading={cargando}
      />
    </div>
  );
}
