import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 150 },
];

export default function TablaTiendas(props) {
  const [tiendas, setTiendas] = React.useState([]);
  const [tiendaSelec, setTiendaSelec] = React.useState({});

  const datos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/inventario",
    }).then((response) => {
      setTiendas(response.data);
    });
  };

  const conseguirDatos = () => {
    props.tiendaSelec(tiendaSelec);
  };

  const tiendaSeleccionada = (event) => {
    setTiendaSelec(event.data);
  };

  React.useEffect(() => {
    datos();
  }, []);

  React.useEffect(() => {
    if (tiendas.length === 0) {
      console.log("no existe");
      datos();
    } else {
      console.log("existe");
    }
  }, [tiendas]);

  React.useEffect(() => {
    conseguirDatos();
  }, [tiendaSelec]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={tiendas}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
        onRowSelected={tiendaSeleccionada}
      />
    </div>
  );
}
