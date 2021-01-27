import React from "react";
import { DataGrid, ROWS_CLEARED } from "@material-ui/data-grid";

const columns = [
  {
    field: "dia",
    headerName: "Día",
    width: 120,
    type: "number",
  },
  {
    field: "horaEntrada",
    headerName: "Hora de entrada",
    width: 180,
  },
  {
    field: "horaSalida",
    headerName: "Hora de Salida",
    width: 180,
  },
];

const rows = [
  { id: 1, dia: "Lunes", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 2, dia: "Lunes", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 3, dia: "Lunes", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 4, dia: "Martes", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 5, dia: "Martes", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 6, dia: "Martes", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 7, dia: "Miércoles", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 8, dia: "Miércoles", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 9, dia: "Miércoles", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 10, dia: "Jueves", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 11, dia: "Jueves", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 12, dia: "Jueves", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 13, dia: "Viernes", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 14, dia: "Viernes", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 15, dia: "Viernes", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 16, dia: "Sábado", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 17, dia: "Sábado", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 18, dia: "Sábado", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
  { id: 19, dia: "Domingo", horaEntrada: "9:00AM", horaSalida: "1:00PM" },
  { id: 20, dia: "Domingo", horaEntrada: "1:00PM", horaSalida: "5:00PM" },
  { id: 21, dia: "Domingo", horaEntrada: "5:00PM", horaSalida: "9:00PM" },
];

export default function TablaHorario(props) {
  const [seleccion, setSeleccion] = React.useState([]);
  const [horario, setHorario] = React.useState([]);

  const guardarSelec = (event) => {
    setSeleccion(event["rowIds"]);
  };

  React.useEffect(() => {
    let aux = [];
    for (let index = 0; index < seleccion.length; index++) {
      for (let j = 0; j < rows.length; j++) {
        if (seleccion[index] == rows[j].id) {
          aux.push({
            dia: rows[j].dia,
            horaEntrada: rows[j].horaEntrada,
            horaSalida: rows[j].horaSalida,
          });
        }
      }
    }
    setHorario(aux);
  }, [seleccion]);

  console.log(horario);

  return (
    <div style={{ height: 1250, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={21}
        checkboxSelection
        hideFooterPagination
        hideFooterRowCount
        onSelectionChange={guardarSelec}
      />
    </div>
  );
}
