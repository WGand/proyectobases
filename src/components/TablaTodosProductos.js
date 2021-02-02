import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 150 },
  { field: "categoria", headerName: "Categoría", width: 150 },
  {
    field: "precio",
    headerName: "Precio",
    type: "number",
    width: 200,
  },
];

export default function TablaTodosProductos(props) {
  const [productos, setProductos] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);

  const datos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/producto",
    }).then((response) => {
      setProductos(response.data);
    });
  };

  React.useEffect(() => {
    datos();
  }, [props.tiendaId]);

  React.useEffect(() => {
    if (productos.length === 0) {
      console.log("no existe");
      setCargando(true);
    } else {
      console.log("existe");
      setCargando(false);
    }
  }, [productos]);

  console.log(productos);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={productos}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
        loading={cargando}
      />
    </div>
  );
}
