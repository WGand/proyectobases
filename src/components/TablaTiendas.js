import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "tienda", headerName: "Tienda", width: 150 },
  { field: "ubicacion", headerName: "Ubicación", width: 250 },
];

const rows = [
  {
    id: 1,
    tienda: "Tienda 1",
    ubicacion: "Ubicación 1",
  },
  {
    id: 2,
    tienda: "Tienda 2",
    ubicacion: "Ubicación 2",
  },
  {
    id: 3,
    tienda: "Tienda 3",
    ubicacion: "Ubicación 3",
  },
  {
    id: 4,
    tienda: "Tienda 4",
    ubicacion: "Ubicación 4",
  },
  {
    id: 5,
    tienda: "Tienda 5",
    ubicacion: "Ubicación 5",
  },
];

export default function TablaTiendas() {
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
