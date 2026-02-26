/* Agregar elementos a Tareas por hacer*/

const inputTarea = document.getElementById("inputTarea");
const porHacer = document.getElementById("porHacer");

cargarTareas();

function crearTarea(texto) {
  let li = document.createElement("li");
  li.textContent=(texto)

  const borrarBoton = document.createElement(`button`);
  borrarBoton.type = "button";
  borrarBoton.textContent = `Borrar`;
  borrarBoton.className = `btn-borrar`;
  
  
  borrarBoton.addEventListener(`click`, () => {
      li.remove();
      tareaLocal();
    });
    porHacer.appendChild(li);
    li.appendChild(borrarBoton);
}

function guardarTarea() {
  const tarea = inputTarea.value.trim();
  if (tarea) {
    crearTarea(tarea);
    inputTarea.value = ``;
    tareaLocal();
  }
}

function tareaLocal() {
  const tareas = [];
  porHacer.querySelectorAll(`li`).forEach((item) => {
    tareas.push(item.textContent.trim());
  });
  localStorage.setItem(`tareas`, JSON.stringify(tareas));
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem(`tareas`)) || [];
  tareas.forEach(crearTarea);
}

const btnGuardar = document.getElementById("btnGuardar")
btnGuardar.addEventListener(`click`, guardarTarea)

inputTarea.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnGuardar").click();
  }
});
