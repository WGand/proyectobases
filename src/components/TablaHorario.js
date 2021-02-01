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
  { id: 1, dia: "Lunes", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 2, dia: "Lunes", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 3, dia: "Lunes", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 4, dia: "Martes", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 5, dia: "Martes", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 6, dia: "Martes", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 7, dia: "Miércoles", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 8, dia: "Miércoles", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 9, dia: "Miércoles", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 10, dia: "Jueves", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 11, dia: "Jueves", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 12, dia: "Jueves", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 13, dia: "Viernes", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 14, dia: "Viernes", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 15, dia: "Viernes", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 16, dia: "Sábado", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 17, dia: "Sábado", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 18, dia: "Sábado", horaEntrada: "17:00", horaSalida: "21:00" },
  { id: 19, dia: "Domingo", horaEntrada: "09:00", horaSalida: "13:00" },
  { id: 20, dia: "Domingo", horaEntrada: "13:00", horaSalida: "17:00" },
  { id: 21, dia: "Domingo", horaEntrada: "17:00", horaSalida: "21:00" },
];

export default function TablaHorario(props) {
  const [seleccion, setSeleccion] = React.useState({});
  const [horario, setHorario] = React.useState([]);

  const guardarSelec = (event) => {
    setSeleccion(event["rowIds"]);
  };

  const enviarHorario = () => {
    props.conseguirHorario(horario);
  };

  React.useEffect(() => {
    let aux = {};
    let cont = 0;
    for (let index = 0; index < seleccion.length; index++) {
      for (let j = 0; j < rows.length; j++) {
        if (seleccion[index] == rows[j].id) {
          aux[cont] = {
            dia: rows[j].dia.toUpperCase(),
            hora_inicio: rows[j].horaEntrada,
            hora_fin: rows[j].horaSalida,
          };
          cont++;
        }
      }
    }
    setHorario(aux);
  }, [seleccion]);

  React.useEffect(() => {
    enviarHorario();
  }, [horario]);

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
