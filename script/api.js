
document.addEventListener("DOMContentLoaded", () => {
    const tiempo = document.getElementById("horayFecha");
   if (tiempo) tiempo.textContent = (new Date).toLocaleDateString("es-CL");

   obtenerClimaUbicacion()
});



function obtenerIcono(code) {
    if (code===0) return "☀";
    if (code <=3) return "⛅";
    if (code <= 48) return "☁";
    if (code <=67) return "🌨"
    if (code <=77) return "❄";
    return "🌡";
}

function obtenerClimaUbicacion () {

    navigator.geolocation.getCurrentPosition(async (posicion) => {

        const lat = posicion.coords.latitude;
        const lon = posicion.coords.longitude;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=apparent_temperature,weather_code&timezone=auto`;

        const res = await fetch (url);
        const data = await res.json();

        const temp = data.current.apparent_temperature;
        const code = data.current.weather_code;

        const climaCard = document.querySelector(".clima-card");
        const climaInfo = document.querySelector(".clima-info");

        climaCard.innerHTML = "";
        climaInfo.innerhtl = "";

        const emoji = document.createElement("p");
        emoji.className = "emojiClima";
        emoji.textContent = obtenerIcono(code);

        const ciudad = document.createElement("h2");
        ciudad.className = "mmostrarCiudad";
ciudad.textContent = "Tu ubicación";

const temperatura = document.createElement("p");
temperatura.className = "mostrarTemperatura";
temperatura.textContent = `${Math.round(temp)}°C`;

climaInfo.appendChild(ciudad);
climaInfo.appendChild(temperatura);

climaCard.appendChild(emoji);
climaCard.appendChild(climaInfo);
    },
    () => mostrarError ("No se pudo obtener ubicación.")
);
}
function mostrarError(mensaje){
 const climaCard = document.querySelector(".clima-card")
 if (!climaCard) return;

 climaCard.textContent ="" ;
const p = document.createElement("p");
p.textContent = mensaje;
p.classList.add("errorDisplay");
 climaCard.appendChild(p);
}