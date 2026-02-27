/*Mover elemento*/

let tareaSeleccionada = null;
let modoMover = false;

const listas = document.querySelectorAll("ul");

listas.forEach((ul) => {
  ul.addEventListener(`click`, (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    if (!modoMover) {
      if (tareaSeleccionada) {
        tareaSeleccionada.classList.remove("tarea-seleccionada");
      }
      li.classList.add("tarea-seleccionada");
      tareaSeleccionada = li;
    }
  });
});

const btnMover = document.getElementById("mover");

btnMover.addEventListener(`click`, () => {
  if (!tareaSeleccionada) {
    alert("Seleccione una tarea primero.");
    return;
  }

  modoMover = true;
  btnMover.textContent = "Seleccionar columna.";
});

listas.forEach((ul) => {
  ul.addEventListener(`click`, async (event) => {
    if (!modoMover) return;
    const ulDestino = event.target.closest(
      `#porHacer, #enProceso, #yaRealizadas`,
    );
    if (!ulDestino) return;

    await animarCarga(tareaSeleccionada, 2000);

    ulDestino.appendChild(tareaSeleccionada);
    tareaSeleccionada.classList.remove("loading");
    tareaSeleccionada.classList.remove("tarea-seleccionada");
    tareaSeleccionada = null;

    modoMover = false;
    btnMover.textContent = "Mover tarea";
  });
});

/*mouseover botones*/

const boton = document.querySelectorAll("button");

boton.forEach((boton) => {
  boton.addEventListener(`mouseover`, () => {
    boton.style.backgroundColor = "#ffcfd8";
    boton.style.transform = "translateY(-5px)";
    boton.style.boxShadow = "5px 6px 3px rgba(146, 28, 102, 0.5)";
  });
});

boton.forEach((boton) => {
  boton.addEventListener(`mouseout`, () => {
    boton.style.backgroundColor = "";
    boton.style.transform = "translateY(0px)";
    boton.style.boxShadow = "none";
  });
});

/* Enter en submit tarea*/

inputFecha.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnGuardar.click();
  }
});
