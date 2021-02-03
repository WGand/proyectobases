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
    field: "rubro",
    headerName: "Rubro",
    width: 180,
  },
];

export default function TablaProveedor(props) {
  const [usuarios, setUsuarios] = React.useState({});
  const [proveedor, setProveedor] = React.useState([]);
  const [proveedorSelec, setProveedorSelec] = React.useState({});
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
    props.proveedorSelec(proveedorSelec);
  };

  const proveedorSeleccionado = (event) => {
    setProveedorSelec(event.data);
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
        (proveedor) => proveedor.rubro !== null
      );
      setProveedor(aux);
      setCargando(false);
    }
  }, [usuarios]);

  React.useEffect(() => {
    conseguirDatos();
  }, [proveedorSelec]);

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={proveedor}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
        onRowSelected={proveedorSeleccionado}
        loading={cargando}
      />
    </div>
  );
}
