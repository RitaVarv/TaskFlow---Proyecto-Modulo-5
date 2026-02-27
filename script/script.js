/* Agregar elementos a Tareas por hacer*/

const inputTarea = document.getElementById("inputTarea");
const porHacer = document.getElementById("porHacer");
const enProceso = document.getElementById("enProceso");
const yaRealizadas = document.getElementById("yaRealizadas");


cargarTareas();

function animarCarga(elemento, tiempo = 2000) {
  return new Promise(resolve => {
    elemento.classList.add("loading")

    setTimeout (() =>{
      elemento.classList.remove("loading");
      resolve();
    }, tiempo);
  });
}

function crearTarea(texto) {
  let li = document.createElement("li");
  li.textContent=(texto)
  li.className = "item-tarea";

  const borrarBoton = document.createElement(`button`);
  borrarBoton.type = "button";
  borrarBoton.textContent = "Borrar";
  borrarBoton.className = `btn-borrar`;
  
  
  borrarBoton.addEventListener(`click`, () => {
      li.remove();
      tareaLocal();
    });
    porHacer.appendChild(li);
    li.appendChild(borrarBoton);
}

async function guardarTarea() {
  const tareaGuardada = inputTarea.value.trim();
  if (tareaGuardada) {
    await animarCarga(btnGuardar, 2000)
    crearTarea(tareaGuardada);
    inputTarea.value = ``;
    tareaLocal();
  }
}

function tareaLocal() {
  const tareas = [];
  porHacer.querySelectorAll(`li`).forEach((item) => {
    tareas.push(item.firstChild.textContent.trim());
  });
  localStorage.setItem(`tareas`, JSON.stringify(tareas));
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem(`tareas`)) || [];
  tareas.forEach(crearTarea);
}

const btnGuardar = document.getElementById("btnGuardar")
btnGuardar.addEventListener(`click`, guardarTarea 
)

inputTarea.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnGuardar.click();
  }
});

