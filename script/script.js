/* Agregar elementos a Tareas por hacer*/

const inputTarea = document.getElementById("inputTarea")
const porHacer = document.getElementById("porHacer")

cargarTareas();

function crearTarea(texto) {
    let li = document.createElement("li");
    li.textContent = texto;
    porHacer.appendChild(li);
}


function guardarTarea () {
    const tarea = inputTarea.value.trim();
    if (tarea) {
        crearTarea(tarea);
        inputTarea.value = ``;
        tareaLocal();
    }
}

function tareaLocal () {
    let tareas = [];
    porHacer.querySelectorAll(`li`).forEach(function (item) {
        tareas.push(item.textContent.trim());
    });
    localStorage.setItem(`tareas`, JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem(`tareas`)) || [];
    tareas.forEach(crearTarea)
};

inputTarea.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btnGuardar").click();
    }
})