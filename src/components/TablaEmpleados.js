import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "cedula", headerName: "Cédula", width: 150, type: "number" },
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "cargo", headerName: "Cargos", width: 150 },
];

const rows = [
  {
    id: 1,
    cedula: 11111111,
    nombre: "Empleado 1",
    cargo: "Cargo 1",
  },
  {
    id: 2,
    cedula: 22222222,
    nombre: "Empleado 2",
    cargo: "Cargo 2",
  },
  {
    id: 3,
    cedula: 33333333,
    nombre: "Empleado 3",
    cargo: "Cargo 3",
  },
  {
    id: 4,
    cedula: 44444444,
    nombre: "Empleado 4",
    cargo: "Cargo 4",
  },
  {
    id: 5,
    cedula: 55555555,
    nombre: "Empleado 5",
    cargo: "Cargo 5",
  },
];

export default function TablaEmpleados() {
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
