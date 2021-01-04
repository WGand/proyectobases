import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "producto", headerName: "Producto", width: 150 },
  { field: "descripcion", headerName: "Descripcion", width: 250 },
  {
    field: "cantidad",
    headerName: "Cantidad",
    type: "number",
    width: 120,
  },
  {
    field: "precio",
    headerName: "Precio",
    type: "number",
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    producto: "Producto 1",
    descripcion: "Descripción 1",
    cantidad: 35,
    precio: 100,
  },
  {
    id: 2,
    producto: "Producto 2",
    descripcion: "Descripción 2",
    cantidad: 42,
    precio: 80,
  },
  {
    id: 3,
    producto: "Producto 3",
    descripcion: "Descripción 3",
    cantidad: 45,
    precio: 60,
  },
  {
    id: 4,
    producto: "Producto 4",
    descripcion: "Descripción 4",
    cantidad: 16,
    precio: 40,
  },
  {
    id: 5,
    producto: "Producto 5",
    descripcion: "Descripción 5",
    cantidad: 3,
    precio: 20,
  },
];

export default function TablaProductos() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        hideFooterSelectedRowCount
      />
    </div>
  );
}
