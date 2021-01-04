import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "rif", headerName: "RIF", width: 150 },
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "rubro", headerName: "Rubro", width: 150 },
];

const rows = [
  {
    id: 1,
    rif: 111111,
    nombre: "Proveedor 1",
    rubro: "Rubro 1",
  },
  {
    id: 2,
    rif: 222222,
    nombre: "Proveedor 2",
    rubro: "Rubro 2",
  },
  {
    id: 3,
    rif: 333333,
    nombre: "Proveedor 3",
    rubro: "Rubro 3",
  },
  {
    id: 4,
    rif: 444444,
    nombre: "Proveedor 4",
    rubro: "Rubro 4",
  },
  {
    id: 5,
    rif: 555555,
    nombre: "Proveedor 5",
    rubro: "Rubro 5",
  },
];

export default function TablaProveedores() {
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
