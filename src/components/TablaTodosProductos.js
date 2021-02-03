import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "categoria", headerName: "Categoría", width: 200 },
  {
    field: "precio",
    headerName: "Precio",
    type: "number",
    width: 200,
  },
];

export default function TablaTodosProductos(props) {
  const [productos, setProductos] = React.useState([]);
  const [productoSelec, setProductoSelec] = React.useState({});
  const [cargando, setCargando] = React.useState(false);

  const datos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/producto",
    }).then((response) => {
      setProductos(response.data);
    });
  };

  const conseguirProducto = () => {
    props.productoSelec(productoSelec);
  };

  const productoSeleccionado = (event) => {
    setProductoSelec(event.data);
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

  React.useEffect(() => {
    conseguirProducto();
  }, [productoSelec]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={productos}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
        onRowSelected={productoSeleccionado}
        loading={cargando}
      />
    </div>
  );
}
