/* Agregar elementos a Tareas por hacer*/

const inputTarea = document.getElementById("inputTarea");
const inputFecha = document.getElementById("inputFecha");
const porHacer = document.getElementById("porHacer");
const enProceso = document.getElementById("enProceso");
const yaRealizadas = document.getElementById("yaRealizadas");

cargarTareas();

/*animación de carga*/

function animarCarga(elemento, tiempo = 2000) {
  return new Promise((resolve) => {
    elemento.classList.add("loading");

    setTimeout(() => {
      elemento.classList.remove("loading");
      resolve();
    }, tiempo);
  });
}

/*funciones de crear elemento Tarea*/

function actualizarCountdown(li) {
  const contador = li.querySelector(".countdown");
  if (!contador) return;
  const fecha = li.dataset.fecha;
  contador.textContent = diasRestantes(fecha);
}

function crearTarea(texto, fecha =" ") {
  const li = document.createElement("li");
  li.className = "item-tarea";
  li.dataset.fecha = fecha;


  const spanTexto = document.createElement("span");
  spanTexto.className = "texto-tarea";
  spanTexto.textContent = texto;

  const contador = document.createElement("small");
  contador.className = "countdown"

  const borrarBoton = document.createElement(`button`);
  borrarBoton.type = "button";
  borrarBoton.textContent = "Borrar";
  borrarBoton.className = `btn-borrar`;

  borrarBoton.addEventListener(`click`, () => {
    li.remove();
    tareaLocal();
  });
  li.appendChild(spanTexto);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(contador);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(borrarBoton);


  porHacer.appendChild(li);
  actualizarCountdown(li);
}

async function guardarTarea() {
  
  const btnGuardar = document.getElementById("btnGuardar");

  const tareaGuardada = inputTarea.value.trim();
  const fecha = inputFecha.value;
  
  if (!tareaGuardada) return;
    await animarCarga(btnGuardar, 2000);
    crearTarea(tareaGuardada, fecha);
    inputTarea.value = ``;
    inputFecha.value =``;
    tareaLocal();
  }


function tareaLocal() {
  const tareas = [];
  porHacer.querySelectorAll(`li.item-tarea`).forEach((li) => {
    const texto = li.querySelector(".texto-tarea")?.textContent.trim() || "";
    const fecha = li.dataset.fecha || ""
    tareas.push({texto, fecha});
    console.log("GUARDANDO:", tareas);
  localStorage.setItem(`tareas`, JSON.stringify(tareas));
})}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem(`tareas`)) || [];
  tareas.forEach((t) => {
    if (typeof t === "string")
      crearTarea(t, "");
    else crearTarea(t.texto, t.fecha || "");
  
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener(`click`, guardarTarea);

})

function diasRestantes(fechaISO) {
  if (!fechaISO) return "";

  const hoy = new Date();
hoy.setHours(0,0,0,0);

  const limite = new Date(fechaISO);
  limite.setHours(0,0,0,0);

  const diff = limite - hoy;
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (dias <0) return ("Vencida");
  if(dias === 0) return ("Vence hoy")
    return `Faltan ${dias} días.`
}

setInterval(() => {
  document.querySelectorAll(".item-tarea").forEach(actualizarCountdown);
}, 60000);


