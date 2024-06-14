import { equipos } from "./equipos.js";
const Json = equipos.teams;
const option = document.getElementById("gruposSelector");
const tabla = document.getElementById("tabla");
const tablaClasificacion = document.getElementById("tablaClasificacion");
const ronda_1 = document.getElementById("ronda_1");
const ronda_2 = document.getElementById("ronda_2");
const ronda_3 = document.getElementById("ronda_3");
const descargar = document.getElementById("descargar");
const nuevoJson = [];

function mostrarEquipos(data) {
  const grupoA = data.filter((d) => d.group === "A");
  const grupoB = data.filter((d) => d.group === "B");
  const grupoC = data.filter((d) => d.group === "C");
  const grupoD = data.filter((d) => d.group === "D");
  switch (option.value) {
    case "A":
      mostrarEnfrentamientosA(grupoA);
      mostrarGupoA(grupoA);
      ganadoresGrupoA(grupoA);
      break;
    case "B":
      mostrarEnfrentamientosB(grupoB);
      mostrarGupoB(grupoB);
      ganadoresGrupoB(grupoB);
      break;
    case "C":
      mostrarEnfrentamientosC(grupoC);
      mostrarGupoC(grupoC);
      ganadoresGrupoC(grupoC);
      break;
    case "D":
      mostrarEnfrentamientosD(grupoD);
      mostrarGupoD(grupoD);
      ganadoresGrupoD(grupoD);
      break;
    default:
      break;
  }
}

// Funcion para generar los resultados de los partidos
function generarGoles() {
  const N = [];
  for (let i = 0; i < 4; i++) {
    N.push(Math.floor(Math.random() * 4));
  }
  return N;
}

// Grupo A
function mostrarGupoA(A) {
  tabla.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < A.length; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${A[i].name}</td>
      <td>${A[i].games_played}</td>
      <td>${A[i].games_wined}</td>
      <td>${A[i].games_draw}</td>
      <td>${A[i].games_lossed}</td>
      <td>${A[i].goals}</td>
      <td>${A[i].against_goals}</td>
      <td>${A[i].goal_difference}</td>
      <td>${A[i].points}</td>
    </tr>`;
  }
  datos += `</tbody>
    </table>`;

  tabla.innerHTML = datos;
}

function mostrarEnfrentamientosA(A) {
  // Ronda 1
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles = generarGoles();

  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  A[0].goals += goles[0];
  A[0].against_goals += goles[1];
  // Segundo equipo
  A[1].goals += goles[1];
  A[1].against_goals += goles[0];
  // Tercer equipo
  A[2].goals += goles[2];
  A[2].against_goals += goles[3];
  // Cuarto equipo
  A[3].goals += goles[3];
  A[3].against_goals += goles[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Primer partido (2 equipos)
  if (goles[0] === goles[1]) {
    A[1].games_draw += 1;
    A[0].games_draw += 1;
  } else if (goles[0] < goles[1]) {
    A[0].games_lossed += 1;
    A[1].games_wined += 1;
  } else if (goles[0] > goles[1]) {
    A[0].games_wined += 1;
    A[1].games_lossed += 1;
  }
  // Primer partido (los otros 2 equipos)
  if (goles[2] === goles[3]) {
    A[2].games_draw += 1;
    A[3].games_draw += 1;
  } else if (goles[2] < goles[3]) {
    A[2].games_lossed += 1;
    A[3].games_wined += 1;
  } else if (goles[2] > goles[3]) {
    A[2].games_wined += 1;
    A[3].games_lossed += 1;
  }

  ronda_1.innerHTML = "";
  let datos = "";
  datos = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${A[0].name}</td>
          <td class="text-center">${goles[0]}</td>
          <td class="text-center">${goles[1]}</td>
          <td colspan="2" class="text-end">${A[1].name}</td>
        </tr>
        <tr>
          <td colspan="2">${A[2].name}</td>
          <td class="text-center">${goles[2]}</td>
          <td class="text-center">${goles[3]}</td>
          <td colspan="2" class="text-end">${A[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_1.innerHTML = datos;

  // Ronda 2
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles2 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  A[0].goals += goles2[0];
  A[0].against_goals += goles2[1];
  // Segundo equipo
  A[2].goals += goles2[1];
  A[2].against_goals += goles2[0];
  // Tercer equipo
  A[1].goals += goles2[2];
  A[1].against_goals += goles2[3];
  // Cuarto equipo
  A[3].goals += goles2[3];
  A[3].against_goals += goles2[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles2[0] === goles2[1]) {
    A[0].games_draw += 1;
    A[2].games_draw += 1;
  } else if (goles2[0] < goles2[1]) {
    A[0].games_lossed += 1;
    A[2].games_wined += 1;
  } else if (goles2[0] > goles2[1]) {
    A[0].games_wined += 1;
    A[2].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles2[2] === goles2[3]) {
    A[1].games_draw += 1;
    A[3].games_draw += 1;
  } else if (goles2[2] < goles2[3]) {
    A[3].games_wined += 1;
    A[1].games_lossed += 1;
  } else if (goles2[2] > goles2[3]) {
    A[1].games_wined += 1;
    A[3].games_lossed += 1;
  }

  ronda_2.innerHTML = "";
  let datos2 = "";
  datos2 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${A[0].name}</td>
          <td class="text-center">${goles2[0]}</td>
          <td class="text-center">${goles2[1]}</td>
          <td colspan="2" class="text-end">${A[2].name}</td>
        </tr>
        <tr>
          <td colspan="2">${A[1].name}</td>
          <td class="text-center">${goles2[2]}</td>
          <td class="text-center">${goles2[3]}</td>
          <td colspan="2" class="text-end">${A[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_2.innerHTML = datos2;

  // Ronda 3
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles3 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  A[0].goals += goles3[0];
  A[0].against_goals += goles3[1];
  // Segundo equipo
  A[3].goals += goles3[1];
  A[3].against_goals += goles3[0];
  // Tercer equipo
  A[1].goals += goles3[2];
  A[1].against_goals += goles3[3];
  // Cuarto equipo
  A[2].goals += goles3[3];
  A[2].against_goals += goles3[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles3[0] === goles3[1]) {
    A[0].games_draw += 1;
    A[3].games_draw += 1;
  } else if (goles3[0] < goles3[1]) {
    A[0].games_lossed += 1;
    A[3].games_wined += 1;
  } else if (goles3[0] > goles3[1]) {
    A[0].games_wined += 1;
    A[3].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles3[2] === goles3[3]) {
    A[1].games_draw += 1;
    A[2].games_draw += 1;
  } else if (goles3[2] < goles3[3]) {
    A[2].games_wined += 1;
    A[1].games_lossed += 1;
  } else if (goles3[2] > goles3[3]) {
    A[1].games_wined += 1;
    A[2].games_lossed += 1;
  }

  ronda_3.innerHTML = "";
  let datos3 = "";
  datos3 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${A[0].name}</td>
          <td class="text-center">${goles3[0]}</td>
          <td class="text-center">${goles3[1]}</td>
          <td colspan="2" class="text-end">${A[3].name}</td>
        </tr>
        <tr>
          <td colspan="2">${A[1].name}</td>
          <td class="text-center">${goles3[2]}</td>
          <td class="text-center">${goles3[3]}</td>
          <td colspan="2" class="text-end">${A[2].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_3.innerHTML = datos3;

  // Agregar valores de partidos jugados
  A[0].games_played += 3;
  A[1].games_played += 3;
  A[2].games_played += 3;
  A[3].games_played += 3;

  // Calcular diferencia de gol
  A[0].goal_difference = A[0].goals - A[0].against_goals;
  A[1].goal_difference = A[1].goals - A[1].against_goals;
  A[2].goal_difference = A[2].goals - A[2].against_goals;
  A[3].goal_difference = A[3].goals - A[3].against_goals;

  // Calcular puntos
  A[0].points = A[0].games_wined * 3 + A[0].games_draw;
  A[1].points = A[1].games_wined * 3 + A[1].games_draw;
  A[2].points = A[2].games_wined * 3 + A[2].games_draw;
  A[3].points = A[3].games_wined * 3 + A[3].games_draw;
}

// Grupo B
function mostrarGupoB(B) {
  tabla.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < B.length; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${B[i].name}</td>
      <td>${B[i].games_played}</td>
      <td>${B[i].games_wined}</td>
      <td>${B[i].games_draw}</td>
      <td>${B[i].games_lossed}</td>
      <td>${B[i].goals}</td>
      <td>${B[i].against_goals}</td>
      <td>${B[i].goal_difference}</td>
      <td>${B[i].points}</td>
    </tr>`;
  }
  datos += `</tbody>
    </table>`;

  tabla.innerHTML = datos;
}

function mostrarEnfrentamientosB(B) {
  // Ronda 1
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles = generarGoles();

  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  B[0].goals += goles[0];
  B[0].against_goals += goles[1];
  // Segundo equipo
  B[1].goals += goles[1];
  B[1].against_goals += goles[0];
  // Tercer equipo
  B[2].goals += goles[2];
  B[2].against_goals += goles[3];
  // Cuarto equipo
  B[3].goals += goles[3];
  B[3].against_goals += goles[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Primer partido (2 equipos)
  if (goles[0] === goles[1]) {
    B[1].games_draw += 1;
    B[0].games_draw += 1;
  } else if (goles[0] < goles[1]) {
    B[0].games_lossed += 1;
    B[1].games_wined += 1;
  } else if (goles[0] > goles[1]) {
    B[0].games_wined += 1;
    B[1].games_lossed += 1;
  }
  // Primer partido (los otros 2 equipos)
  if (goles[2] === goles[3]) {
    B[2].games_draw += 1;
    B[3].games_draw += 1;
  } else if (goles[2] < goles[3]) {
    B[2].games_lossed += 1;
    B[3].games_wined += 1;
  } else if (goles[2] > goles[3]) {
    B[2].games_wined += 1;
    B[3].games_lossed += 1;
  }

  ronda_1.innerHTML = "";
  let datos = "";
  datos = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${B[0].name}</td>
          <td class="text-center">${goles[0]}</td>
          <td class="text-center">${goles[1]}</td>
          <td colspan="2" class="text-end">${B[1].name}</td>
        </tr>
        <tr>
          <td colspan="2">${B[2].name}</td>
          <td class="text-center">${goles[2]}</td>
          <td class="text-center">${goles[3]}</td>
          <td colspan="2" class="text-end">${B[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_1.innerHTML = datos;

  // Ronda 2
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles2 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  B[0].goals += goles2[0];
  B[0].against_goals += goles2[1];
  // Segundo equipo
  B[2].goals += goles2[1];
  B[2].against_goals += goles2[0];
  // Tercer equipo
  B[1].goals += goles2[2];
  B[1].against_goals += goles2[3];
  // Cuarto equipo
  B[3].goals += goles2[3];
  B[3].against_goals += goles2[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles2[0] === goles2[1]) {
    B[0].games_draw += 1;
    B[2].games_draw += 1;
  } else if (goles2[0] < goles2[1]) {
    B[0].games_lossed += 1;
    B[2].games_wined += 1;
  } else if (goles2[0] > goles2[1]) {
    B[0].games_wined += 1;
    B[2].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles2[2] === goles2[3]) {
    B[1].games_draw += 1;
    B[3].games_draw += 1;
  } else if (goles2[2] < goles2[3]) {
    B[3].games_wined += 1;
    B[1].games_lossed += 1;
  } else if (goles2[2] > goles2[3]) {
    B[1].games_wined += 1;
    B[3].games_lossed += 1;
  }

  ronda_2.innerHTML = "";
  let datos2 = "";
  datos2 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${B[0].name}</td>
          <td class="text-center">${goles2[0]}</td>
          <td class="text-center">${goles2[1]}</td>
          <td colspan="2" class="text-end">${B[2].name}</td>
        </tr>
        <tr>
          <td colspan="2">${B[1].name}</td>
          <td class="text-center">${goles2[2]}</td>
          <td class="text-center">${goles2[3]}</td>
          <td colspan="2" class="text-end">${B[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_2.innerHTML = datos2;

  // Ronda 3
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles3 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  B[0].goals += goles3[0];
  B[0].against_goals += goles3[1];
  // Segundo equipo
  B[3].goals += goles3[1];
  B[3].against_goals += goles3[0];
  // Tercer equipo
  B[1].goals += goles3[2];
  B[1].against_goals += goles3[3];
  // Cuarto equipo
  B[2].goals += goles3[3];
  B[2].against_goals += goles3[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles3[0] === goles3[1]) {
    B[0].games_draw += 1;
    B[3].games_draw += 1;
  } else if (goles3[0] < goles3[1]) {
    B[0].games_lossed += 1;
    B[3].games_wined += 1;
  } else if (goles3[0] > goles3[1]) {
    B[0].games_wined += 1;
    B[3].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles3[2] === goles3[3]) {
    B[1].games_draw += 1;
    B[2].games_draw += 1;
  } else if (goles3[2] < goles3[3]) {
    B[2].games_wined += 1;
    B[1].games_lossed += 1;
  } else if (goles3[2] > goles3[3]) {
    B[1].games_wined += 1;
    B[2].games_lossed += 1;
  }

  ronda_3.innerHTML = "";
  let datos3 = "";
  datos3 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${B[0].name}</td>
          <td class="text-center">${goles3[0]}</td>
          <td class="text-center">${goles3[1]}</td>
          <td colspan="2" class="text-end">${B[3].name}</td>
        </tr>
        <tr>
          <td colspan="2">${B[1].name}</td>
          <td class="text-center">${goles3[2]}</td>
          <td class="text-center">${goles3[3]}</td>
          <td colspan="2" class="text-end">${B[2].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_3.innerHTML = datos3;

  // Agregar valores de partidos jugados
  B[0].games_played += 3;
  B[1].games_played += 3;
  B[2].games_played += 3;
  B[3].games_played += 3;

  // Calcular diferencia de gol
  B[0].goal_difference = B[0].goals - B[0].against_goals;
  B[1].goal_difference = B[1].goals - B[1].against_goals;
  B[2].goal_difference = B[2].goals - B[2].against_goals;
  B[3].goal_difference = B[3].goals - B[3].against_goals;

  // Calcular puntos
  B[0].points = B[0].games_wined * 3 + B[0].games_draw;
  B[1].points = B[1].games_wined * 3 + B[1].games_draw;
  B[2].points = B[2].games_wined * 3 + B[2].games_draw;
  B[3].points = B[3].games_wined * 3 + B[3].games_draw;
}

// Grupo C
function mostrarGupoC(C) {
  tabla.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < C.length; i++) {
    datos += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${C[i].name}</td>
    <td>${C[i].games_played}</td>
    <td>${C[i].games_wined}</td>
    <td>${C[i].games_draw}</td>
    <td>${C[i].games_lossed}</td>
    <td>${C[i].goals}</td>
    <td>${C[i].against_goals}</td>
    <td>${C[i].goal_difference}</td>
    <td>${C[i].points}</td>
  </tr>`;
  }
  datos += `</tbody>
    </table>`;

  tabla.innerHTML = datos;
}

function mostrarEnfrentamientosC(C) {
  // Ronda 1
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles = generarGoles();

  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  C[0].goals += goles[0];
  C[0].against_goals += goles[1];
  // Segundo equipo
  C[1].goals += goles[1];
  C[1].against_goals += goles[0];
  // Tercer equipo
  C[2].goals += goles[2];
  C[2].against_goals += goles[3];
  // Cuarto equipo
  C[3].goals += goles[3];
  C[3].against_goals += goles[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Primer partido (2 equipos)
  if (goles[0] === goles[1]) {
    C[1].games_draw += 1;
    C[0].games_draw += 1;
  } else if (goles[0] < goles[1]) {
    C[0].games_lossed += 1;
    C[1].games_wined += 1;
  } else if (goles[0] > goles[1]) {
    C[0].games_wined += 1;
    C[1].games_lossed += 1;
  }
  // Primer partido (los otros 2 equipos)
  if (goles[2] === goles[3]) {
    C[2].games_draw += 1;
    C[3].games_draw += 1;
  } else if (goles[2] < goles[3]) {
    C[2].games_lossed += 1;
    C[3].games_wined += 1;
  } else if (goles[2] > goles[3]) {
    C[2].games_wined += 1;
    C[3].games_lossed += 1;
  }

  ronda_1.innerHTML = "";
  let datos = "";
  datos = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${C[0].name}</td>
          <td class="text-center">${goles[0]}</td>
          <td class="text-center">${goles[1]}</td>
          <td colspan="2" class="text-end">${C[1].name}</td>
        </tr>
        <tr>
          <td colspan="2">${C[2].name}</td>
          <td class="text-center">${goles[2]}</td>
          <td class="text-center">${goles[3]}</td>
          <td colspan="2" class="text-end">${C[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_1.innerHTML = datos;

  // Ronda 2
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles2 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  C[0].goals += goles2[0];
  C[0].against_goals += goles2[1];
  // Segundo equipo
  C[2].goals += goles2[1];
  C[2].against_goals += goles2[0];
  // Tercer equipo
  C[1].goals += goles2[2];
  C[1].against_goals += goles2[3];
  // Cuarto equipo
  C[3].goals += goles2[3];
  C[3].against_goals += goles2[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles2[0] === goles2[1]) {
    C[0].games_draw += 1;
    C[2].games_draw += 1;
  } else if (goles2[0] < goles2[1]) {
    C[0].games_lossed += 1;
    C[2].games_wined += 1;
  } else if (goles2[0] > goles2[1]) {
    C[0].games_wined += 1;
    C[2].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles2[2] === goles2[3]) {
    C[1].games_draw += 1;
    C[3].games_draw += 1;
  } else if (goles2[2] < goles2[3]) {
    C[3].games_wined += 1;
    C[1].games_lossed += 1;
  } else if (goles2[2] > goles2[3]) {
    C[1].games_wined += 1;
    C[3].games_lossed += 1;
  }

  ronda_2.innerHTML = "";
  let datos2 = "";
  datos2 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${C[0].name}</td>
          <td class="text-center">${goles2[0]}</td>
          <td class="text-center">${goles2[1]}</td>
          <td colspan="2" class="text-end">${C[2].name}</td>
        </tr>
        <tr>
          <td colspan="2">${C[1].name}</td>
          <td class="text-center">${goles2[2]}</td>
          <td class="text-center">${goles2[3]}</td>
          <td colspan="2" class="text-end">${C[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_2.innerHTML = datos2;

  // Ronda 3
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles3 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  C[0].goals += goles3[0];
  C[0].against_goals += goles3[1];
  // Segundo equipo
  C[3].goals += goles3[1];
  C[3].against_goals += goles3[0];
  // Tercer equipo
  C[1].goals += goles3[2];
  C[1].against_goals += goles3[3];
  // Cuarto equipo
  C[2].goals += goles3[3];
  C[2].against_goals += goles3[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles3[0] === goles3[1]) {
    C[0].games_draw += 1;
    C[3].games_draw += 1;
  } else if (goles3[0] < goles3[1]) {
    C[0].games_lossed += 1;
    C[3].games_wined += 1;
  } else if (goles3[0] > goles3[1]) {
    C[0].games_wined += 1;
    C[3].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles3[2] === goles3[3]) {
    C[1].games_draw += 1;
    C[2].games_draw += 1;
  } else if (goles3[2] < goles3[3]) {
    C[2].games_wined += 1;
    C[1].games_lossed += 1;
  } else if (goles3[2] > goles3[3]) {
    C[1].games_wined += 1;
    C[2].games_lossed += 1;
  }

  ronda_3.innerHTML = "";
  let datos3 = "";
  datos3 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${C[0].name}</td>
          <td class="text-center">${goles3[0]}</td>
          <td class="text-center">${goles3[1]}</td>
          <td colspan="2" class="text-end">${C[3].name}</td>
        </tr>
        <tr>
          <td colspan="2">${C[1].name}</td>
          <td class="text-center">${goles3[2]}</td>
          <td class="text-center">${goles3[3]}</td>
          <td colspan="2" class="text-end">${C[2].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_3.innerHTML = datos3;

  // Agregar valores de partidos jugados
  C[0].games_played += 3;
  C[1].games_played += 3;
  C[2].games_played += 3;
  C[3].games_played += 3;

  // Calcular diferencia de gol
  C[0].goal_difference = C[0].goals - C[0].against_goals;
  C[1].goal_difference = C[1].goals - C[1].against_goals;
  C[2].goal_difference = C[2].goals - C[2].against_goals;
  C[3].goal_difference = C[3].goals - C[3].against_goals;

  // Calcular puntos
  C[0].points = C[0].games_wined * 3 + C[0].games_draw;
  C[1].points = C[1].games_wined * 3 + C[1].games_draw;
  C[2].points = C[2].games_wined * 3 + C[2].games_draw;
  C[3].points = C[3].games_wined * 3 + C[3].games_draw;
}

// Grupo C
function mostrarGupoD(D) {
  tabla.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < D.length; i++) {
    datos += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${D[i].name}</td>
    <td>${D[i].games_played}</td>
    <td>${D[i].games_wined}</td>
    <td>${D[i].games_draw}</td>
    <td>${D[i].games_lossed}</td>
    <td>${D[i].goals}</td>
    <td>${D[i].against_goals}</td>
    <td>${D[i].goal_difference}</td>
    <td>${D[i].points}</td>
  </tr>`;
  }
  datos += `</tbody>
    </table>`;

  tabla.innerHTML = datos;
}

function mostrarEnfrentamientosD(D) {
  // Ronda 1
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles = generarGoles();

  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  D[0].goals += goles[0];
  D[0].against_goals += goles[1];
  // Segundo equipo
  D[1].goals += goles[1];
  D[1].against_goals += goles[0];
  // Tercer equipo
  D[2].goals += goles[2];
  D[2].against_goals += goles[3];
  // Cuarto equipo
  D[3].goals += goles[3];
  D[3].against_goals += goles[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Primer partido (2 equipos)
  if (goles[0] === goles[1]) {
    D[1].games_draw += 1;
    D[0].games_draw += 1;
  } else if (goles[0] < goles[1]) {
    D[0].games_lossed += 1;
    D[1].games_wined += 1;
  } else if (goles[0] > goles[1]) {
    D[0].games_wined += 1;
    D[1].games_lossed += 1;
  }
  // Primer partido (los otros 2 equipos)
  if (goles[2] === goles[3]) {
    D[2].games_draw += 1;
    D[3].games_draw += 1;
  } else if (goles[2] < goles[3]) {
    D[2].games_lossed += 1;
    D[3].games_wined += 1;
  } else if (goles[2] > goles[3]) {
    D[2].games_wined += 1;
    D[3].games_lossed += 1;
  }

  ronda_1.innerHTML = "";
  let datos = "";
  datos = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${D[0].name}</td>
          <td class="text-center">${goles[0]}</td>
          <td class="text-center">${goles[1]}</td>
          <td colspan="2" class="text-end">${D[1].name}</td>
        </tr>
        <tr>
          <td colspan="2">${D[2].name}</td>
          <td class="text-center">${goles[2]}</td>
          <td class="text-center">${goles[3]}</td>
          <td colspan="2" class="text-end">${D[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_1.innerHTML = datos;

  // Ronda 2
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles2 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  D[0].goals += goles2[0];
  D[0].against_goals += goles2[1];
  // Segundo equipo
  D[2].goals += goles2[1];
  D[2].against_goals += goles2[0];
  // Tercer equipo
  D[1].goals += goles2[2];
  D[1].against_goals += goles2[3];
  // Cuarto equipo
  D[3].goals += goles2[3];
  D[3].against_goals += goles2[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles2[0] === goles2[1]) {
    D[0].games_draw += 1;
    D[2].games_draw += 1;
  } else if (goles2[0] < goles2[1]) {
    D[0].games_lossed += 1;
    D[2].games_wined += 1;
  } else if (goles2[0] > goles2[1]) {
    D[0].games_wined += 1;
    D[2].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles2[2] === goles2[3]) {
    D[1].games_draw += 1;
    D[3].games_draw += 1;
  } else if (goles2[2] < goles2[3]) {
    D[3].games_wined += 1;
    D[1].games_lossed += 1;
  } else if (goles2[2] > goles2[3]) {
    D[1].games_wined += 1;
    D[3].games_lossed += 1;
  }

  ronda_2.innerHTML = "";
  let datos2 = "";
  datos2 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${D[0].name}</td>
          <td class="text-center">${goles2[0]}</td>
          <td class="text-center">${goles2[1]}</td>
          <td colspan="2" class="text-end">${D[2].name}</td>
        </tr>
        <tr>
          <td colspan="2">${D[1].name}</td>
          <td class="text-center">${goles2[2]}</td>
          <td class="text-center">${goles2[3]}</td>
          <td colspan="2" class="text-end">${D[3].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_2.innerHTML = datos2;

  // Ronda 3
  // Almacenamos en una variable los datos que me trae la funcion generarGoles()
  const goles3 = generarGoles();
  // Asignamos los valores de los goles generados a cada valor correspondiente
  // Primer equipo
  D[0].goals += goles3[0];
  D[0].against_goals += goles3[1];
  // Segundo equipo
  D[3].goals += goles3[1];
  D[3].against_goals += goles3[0];
  // Tercer equipo
  D[1].goals += goles3[2];
  D[1].against_goals += goles3[3];
  // Cuarto equipo
  D[2].goals += goles3[3];
  D[2].against_goals += goles3[2];

  // Validamos los ganadores de cada partido para asignar los puntos
  // Segundo partido (2 equipos)
  if (goles3[0] === goles3[1]) {
    D[0].games_draw += 1;
    D[3].games_draw += 1;
  } else if (goles3[0] < goles3[1]) {
    D[0].games_lossed += 1;
    D[3].games_wined += 1;
  } else if (goles3[0] > goles3[1]) {
    D[0].games_wined += 1;
    D[3].games_lossed += 1;
  }
  // Segundo partido (los otros 2 equipos)
  if (goles3[2] === goles3[3]) {
    D[1].games_draw += 1;
    D[2].games_draw += 1;
  } else if (goles3[2] < goles3[3]) {
    D[2].games_wined += 1;
    D[1].games_lossed += 1;
  } else if (goles3[2] > goles3[3]) {
    D[1].games_wined += 1;
    D[2].games_lossed += 1;
  }

  ronda_3.innerHTML = "";
  let datos3 = "";
  datos3 = `
      <thead>
        <tr>
          <th class="text-center" colspan="5">Ronda 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">${D[0].name}</td>
          <td class="text-center">${goles3[0]}</td>
          <td class="text-center">${goles3[1]}</td>
          <td colspan="2" class="text-end">${D[3].name}</td>
        </tr>
        <tr>
          <td colspan="2">${D[1].name}</td>
          <td class="text-center">${goles3[2]}</td>
          <td class="text-center">${goles3[3]}</td>
          <td colspan="2" class="text-end">${D[2].name}</td>
        </tr>
      </tbody>
    </table>`;
  ronda_3.innerHTML = datos3;

  // Agregar valores de partidos jugados
  D[0].games_played += 3;
  D[1].games_played += 3;
  D[2].games_played += 3;
  D[3].games_played += 3;

  // Calcular diferencia de gol
  D[0].goal_difference = D[0].goals - D[0].against_goals;
  D[1].goal_difference = D[1].goals - D[1].against_goals;
  D[2].goal_difference = D[2].goals - D[2].against_goals;
  D[3].goal_difference = D[3].goals - D[3].against_goals;

  // Calcular puntos
  D[0].points = D[0].games_wined * 3 + D[0].games_draw;
  D[1].points = D[1].games_wined * 3 + D[1].games_draw;
  D[2].points = D[2].games_wined * 3 + D[2].games_draw;
  D[3].points = D[3].games_wined * 3 + D[3].games_draw;
}

// Eventos listener
option.addEventListener("change", function () {
  mostrarEquipos(Json);
});

// Función para generar un JSON con los equipos clasificados
function ganadoresGrupoA(A) {
  A.sort((a, b) => {
    // Ordenar por points (descendente)
    if (b.points !== a.points) {
      return b.points - a.points;
      // Si no ordenar por goal_difference (descendente)
    } else if (b.goal_difference !== a.goal_difference) {
      return b.goal_difference - a.goal_difference;
      // Si no ordenar por goals (descendente)
    } else {
      return b.goals - a.goals;
    }
  });
  // Dejamos la tabla en blanco
  tablaClasificacion.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < 2; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${A[i].name}</td>
      <td>${A[i].games_played}</td>
      <td>${A[i].games_wined}</td>
      <td>${A[i].games_draw}</td>
      <td>${A[i].games_lossed}</td>
      <td>${A[i].goals}</td>
      <td>${A[i].against_goals}</td>
      <td>${A[i].goal_difference}</td>
      <td>${A[i].points}</td>
    </tr>`;
    nuevoJson.push(A[i]);
  }
  console.log("Json:", nuevoJson);
  datos += `</tbody>
    </table>`;

  tablaClasificacion.innerHTML = datos;
}

function ganadoresGrupoB(B) {
  B.sort((a, b) => {
    // Ordenar por points (descendente)
    if (b.points !== a.points) {
      return b.points - a.points;
      // Si no ordenar por goal_difference (descendente)
    } else if (b.goal_difference !== a.goal_difference) {
      return b.goal_difference - a.goal_difference;
      // Si no ordenar por goals (descendente)
    } else {
      return b.goals - a.goals;
    }
  });
  // Dejamos la tabla en blanco
  tablaClasificacion.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < 2; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${B[i].name}</td>
      <td>${B[i].games_played}</td>
      <td>${B[i].games_wined}</td>
      <td>${B[i].games_draw}</td>
      <td>${B[i].games_lossed}</td>
      <td>${B[i].goals}</td>
      <td>${B[i].against_goals}</td>
      <td>${B[i].goal_difference}</td>
      <td>${B[i].points}</td>
    </tr>`
    nuevoJson.push(B[i]);
  }
  console.log("Json:", nuevoJson);
  datos += `</tbody>
    </table>`;

  tablaClasificacion.innerHTML = datos;
}

function ganadoresGrupoC(C) {
  C.sort((a, b) => {
    // Ordenar por points (descendente)
    if (b.points !== a.points) {
      return b.points - a.points;
      // Si no ordenar por goal_difference (descendente)
    } else if (b.goal_difference !== a.goal_difference) {
      return b.goal_difference - a.goal_difference;
      // Si no ordenar por goals (descendente)
    } else {
      return b.goals - a.goals;
    }
  });
  // Dejamos la tabla en blanco
  tablaClasificacion.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < 2; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${C[i].name}</td>
      <td>${C[i].games_played}</td>
      <td>${C[i].games_wined}</td>
      <td>${C[i].games_draw}</td>
      <td>${C[i].games_lossed}</td>
      <td>${C[i].goals}</td>
      <td>${C[i].against_goals}</td>
      <td>${C[i].goal_difference}</td>
      <td>${C[i].points}</td>
    </tr>`
    nuevoJson.push(C[i]);
  }
  console.log("Json:", nuevoJson);
  datos += `</tbody>
    </table>`;

  tablaClasificacion.innerHTML = datos;
}

function ganadoresGrupoD(D) {
  D.sort((a, b) => {
    // Ordenar por points (descendente)
    if (b.points !== a.points) {
      return b.points - a.points;
      // Si no ordenar por goal_difference (descendente)
    } else if (b.goal_difference !== a.goal_difference) {
      return b.goal_difference - a.goal_difference;
      // Si no ordenar por goals (descendente)
    } else {
      return b.goals - a.goals;
    }
  });
  // Dejamos la tabla en blanco
  tablaClasificacion.innerHTML = "";
  let datos = "";
  datos = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Equipos</th>
      <th scope="col">PJ</th>
      <th scope="col">PG</th>
      <th scope="col">PE</th>
      <th scope="col">PP</th>
      <th scope="col">GF</th>
      <th scope="col">GC</th>
      <th scope="col">DG</th>
      <th scope="col">Punt</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < 2; i++) {
    datos += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${D[i].name}</td>
      <td>${D[i].games_played}</td>
      <td>${D[i].games_wined}</td>
      <td>${D[i].games_draw}</td>
      <td>${D[i].games_lossed}</td>
      <td>${D[i].goals}</td>
      <td>${D[i].against_goals}</td>
      <td>${D[i].goal_difference}</td>
      <td>${D[i].points}</td>
    </tr>`
    nuevoJson.push(D[i]);
  }
  console.log("Json:", nuevoJson);
  datos += `</tbody>
    </table>`;

  tablaClasificacion.innerHTML = datos;
}

// Función para exportar JSON
function exportarJSON(data, nombreArchivo = 'data.json') {
  // Convertir los datos a una cadena JSON
  const jsonStr = JSON.stringify(data, null, 2);

  // Crear un Blob con el contenido JSON y el tipo MIME apropiado
  const blob = new Blob([jsonStr], { type: "application/json" });

  // Crear un enlace temporal para la descarga
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo;

  // Agregar el enlace al documento, hacer clic y luego eliminarlo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Llamar a la función para exportar los datos
descargar.addEventListener("click", function(){
  exportarJSON(nuevoJson);
})

