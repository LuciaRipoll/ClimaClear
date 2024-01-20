const api = 'https://www.el-tiempo.net/api/json/v2/provincias/';
const path = '/municipios/'
let municipio = '';

// Crear un objeto JSON con 9 capitales
const provinciasMasDestacadas = [["28", "28079"],["08", "08019"],["46", "46250"],
                                ["41", "41091"],["50", "50297"],["29", "29067"],
                                ["30", "30030"],["07","07040"],["35", "35016"]];

const capitales = [["A Coruña", "15", "15030"], ["Alicante", "03", "03014"], ["Albacete", "02", "02003"],
                  ["Almería", "04", "04013"], ["Vitoria-Gasteiz", "01", "01059"], ["Oviedo", "33", "33044"],
                  ["Ávila", "05", "05019"], ["Badajoz", "06", "06015"], ["Barcelona", "08", "08019"],
                  ["Bilbao", "48", "48020"], ["Burgos", "09", "09059"], ["Cáceres", "10", "10037"],
                  ["Cádiz", "11", "11012"], ["Santander", "39", "39075"], ["Castellón de la Plana", "12", "12040"],
                  ["Ceuta", "51", "51001"], ["Ciudad Real", "13", "13034"], ["Córdoba", "14", "14021"],
                  ["Cuenca", "16", "16078"], ["San Sebastián", "20", "20069"], ["Girona", "17", "17079"],
                  ["Granada", "18", "18087"], ["Guadalajara", "19", "19130"], ["Huelva", "21", "21041"],
                  ["Huesca", "22", "22125"], ["Palma de Mallorca", "07", "07040"], ["Jaén", "23", "23050"],
                  ["Logroño", "26", "26089"], ["Las Palmas de Gran Canaria", "35", "35016"], ["León", "24", "24089"],
                  ["Lleida", "25", "25120"], ["Lugo", "27", "27028"], ["Madrid", "28", "28079"],
                  ["Málaga", "29", "29067"], ["Melilla", "52", "52001"], ["Murcia", "30", "30030"],
                  ["Pamplona/Iruña", "31", "31201"], ["Ourense", "32", "32054"], ["Palencia", "34", "34120"],
                  ["Pontevedra", "36", "36038"], ["Salamanca", "37", "37274"], ["Santa Cruz de Tenerife", "38", "38038"],
                  ["Segovia", "40", "40194"], ["Sevilla", "41", "41091"], ["Soria", "42", "42173"],
                  ["Tarragona", "43", "43148"], ["Teruel", "44", "44216"], ["Toledo", "45", "45168"],
                  ["Valencia", "46", "46250"], ["Valladolid", "47", "47186"], ["Zamora", "49", "49275"],
                  ["Zaragoza", "50", "50297"]];
                            
async function getWeather(codProvincia, codCapital) {
  const response = await fetch(api+codProvincia+path+codCapital);
  const data = await response.json();
  return data;
}

/* Función recorrer el array, pedir 9 veces la informacion, la informacion lo coge del getweather. 
  1 por provincia - get weather (return del dato) -> json de la api
  por cada una creo 1 tarjeta 
*/ 
function obtenerCiudadesDestacadas(){
  actualizarMunicipio('');
  const titulo = document.getElementById("titulo");
  titulo.innerHTML = "<h2>Capitales destacadas</h2>"

  const contenedor = document.getElementById("capital-tarjeta");
  contenedor.innerHTML = "";

  const contenedor2 = document.getElementById("contenedor-tarjetas");
  contenedor2.innerHTML = "";

  // Vamos posicion a posiciom
  for (let prov = 0; prov <= provinciasMasDestacadas.length; prov++){
    // Obtenemos la provincia y la capital
    const codProvincia = provinciasMasDestacadas[prov][0];
    const codCapital = provinciasMasDestacadas[prov][1];

    // Llamamos a la funcion getweather que devuelve el JSON entero
    getWeather(codProvincia, codCapital).then(data => {
      // Creamos la tarjeta
      const tarjeta = crearTarjeta(data.fecha, data.municipio.NOMBRE_PROVINCIA, data.temperatura_actual, 
        data.stateSky.description, data.temperaturas.max, data.temperaturas.min);
      // Añadimos la tarjeta al contenedor
      contenedor2.appendChild(tarjeta);
      MathJax.typeset();
    })
  }
}

// Función para crear la tarjeta dinámicamente
function crearTarjeta(fecha, provincia, temperatura, descripcion, temperaturaMax, temperaturaMin){
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  const dateElement = document.createElement("div");
  dateElement.classList.add("info-item", "date");
  dateElement.textContent = fecha;
  tarjeta.appendChild(dateElement)

  const provinceElement = document.createElement("div");
  provinceElement.classList.add("info-item", "province");
  provinceElement.textContent = provincia;
  tarjeta.appendChild(provinceElement)

  const iconAndTempContainer = document.createElement("div");
  iconAndTempContainer.classList.add("icon-and-temp");

  const iconElement = obtenerIconoPorDescripcion(descripcion);
  iconAndTempContainer.appendChild(iconElement);

  const temperatureActElement = document.createElement("div");
  temperatureActElement.classList.add("info-item", "temperatureAct");
  temperatureActElement.textContent = "\\(" + temperatura + "ºC\\)";
  iconAndTempContainer.appendChild(temperatureActElement);

  tarjeta.appendChild(iconAndTempContainer);

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("info-item", "description");
  descriptionElement.textContent = descripcion;
  tarjeta.appendChild(descriptionElement);

  const temperatureRangeElement = document.createElement("div");
  temperatureRangeElement.classList.add("info-item", "temperature-range");

  const temperaturaMaxElement = document.createElement("div");
  temperaturaMaxElement.classList.add("temperature");
  temperaturaMaxElement.textContent = "MAX: \\(" + temperaturaMax + "ºC\\)";
  temperatureRangeElement.appendChild(temperaturaMaxElement);

  const temperaturaMinElement = document.createElement("div");
  temperaturaMinElement.classList.add("temperature");
  temperaturaMinElement.textContent = "MIN: \\(" + temperaturaMin + "ºC\\)";
  temperatureRangeElement.appendChild(temperaturaMinElement);
  tarjeta.appendChild(temperatureRangeElement);

  return tarjeta;
}

function obtenerIconoPorDescripcion(descripcion) {
  const iconElement = document.createElement("i");
  if (descripcion === "Nuboso" || descripcion === "Cubierto" || descripcion === "Muy nuboso" || descripcion === "Intervalos nubosos") {
    iconElement.classList.add("fas", "fa-cloud");
  } else if (descripcion === "Despejado") {
    iconElement.classList.add("fas", "fa-sun");
  } else if (descripcion === "Nubes altas" || descripcion === "Poco nuboso") {
    iconElement.classList.add("fas", "fa-cloud-sun");
  } else if (descripcion ==="Niebla" || descripcion === "Bruma"){
    iconElement.classList.add("fas", "fa-smog"); 
  } else if (descripcion === "Intervalos nubosos con lluvia escasa" || descripcion === "Intervalos nubosos con lluvia"){
    iconElement.classList.add("fas", "fa-cloud-sun-rain"); 
  } else if (descripcion === "Nuboso con lluvia escasa" || descripcion === "Muy nuboso con lluvia escasa" || descripcion === "Cubierto con lluvia" || descripcion === "Cubierto con lluvias escasas" || descripcion === "Cubierto con lluvia escasa" || descripcion === "Muy nuboso con lluvia"){
    iconElement.classList.add("fas", "fa-cloud-rain"); 
  } else if (descripcion === "Nuboso con tormenta" || descripcion === "Intervalos nubosos con tormenta" || descripcion === "Intervalos nubosos con tormenta y lluvia escasa" 
              || descripcion === "Tormenta" || descripcion === "Cubierto con tormenta" || descripcion === "Muy nuboso con tormenta y lluvia escasa" || descripcion === "Cubierto con tormenta y lluvia escasa"){
    iconElement.classList.add("fas", "fa-bolt");
  } else if (descripcion === "Intervalos nubosos con nieve escasa" || descripcion === "Nieve" || descripcion === "Nuboso con nieve escasa" || descripcion === "Intervalos nubosos con nieve"){
    iconElement.classList.add("fas", "fa-snowflake");
  } else if (descripcion === "Granizo"){
    iconElement.classList.add("fas", "fa-cloud-meatball");
  }

  return iconElement;
}

// Actualizar el municipio predeterminado
function actualizarMunicipio(municipioActual){
  municipio = municipioActual;
}

// Función para guardar el municipio como predeterminado
// Si el strig en vacío, guardamos las 9 capitales
function guardarComoPredeterminado() {
  // Municipio actual, guárdalo como predeterminado
  localStorage.setItem('municipioPredeterminado', municipio);

  // Muestra un mensaje de confirmación
  alert('Vista guardada como predeterminada');
}

// Función para manejar el evento del botón de búsqueda
function searchWeather(municipiob) {
  
  let coincidente = false;
  let cont = 0;

  while ((coincidente === false) && (cont < capitales.length)){
    if (municipiob === capitales[cont][0]){
      coincidente = true;
      municipio = capitales[cont][0];
    }
    cont++;
  }

  if (coincidente){
    const titulo = document.getElementById("titulo");
    titulo.innerHTML = "<h2>Capital Buscada</h2>"
    
    // Llamamos a la funcion getweather que devuelve el JSON entero
    getWeather(capitales[cont-1][1], capitales[cont-1][2]).then(data => {
      // Creamos la tarjeta
      const tarjeta = crearTarjetaCapital(data.fecha, data.municipio.NOMBRE_PROVINCIA, data.temperatura_actual, 
        data.stateSky.description, data.temperaturas.max, data.temperaturas.min, data.lluvia,
        data.precipitacion, data.humedad, data.viento);
      // Añadimos la tarjeta al contenedor
      const contenedor = document.getElementById("capital-tarjeta");
      contenedor.innerHTML = "";
      const contenedor2 = document.getElementById("contenedor-tarjetas");
      contenedor2.innerHTML = "";

      contenedor.appendChild(tarjeta);
      MathJax.typeset();
    })
  }else{
    alert("No se ha encontrado el municipio");
  }
}

// Función que completa el datalist
function completarDatalist() {
  const datalist = document.getElementById('listaCompletadoCiudades');
  capitales.map(capital => capital[0]).forEach(ciudad => {
    let option = document.createElement('option');
    option.value = ciudad;
    datalist.appendChild(option);
  });
}

// Función para crear la tarjeta dinámicamente
function crearTarjetaCapital(fecha, provincia, temperatura, descripcion, temperaturaMax, temperaturaMin, lluvia, probLluvia, humedad, viento){
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card-capital");

  const dateElement = document.createElement("div");
  dateElement.classList.add("capital-item", "date");
  dateElement.textContent = fecha;
  tarjeta.appendChild(dateElement)

  const provinceElement = document.createElement("div");
  provinceElement.classList.add("capital-item", "province");
  provinceElement.textContent = provincia;
  tarjeta.appendChild(provinceElement)

  const iconAndTempContainer = document.createElement("div");
  iconAndTempContainer.classList.add("icon-and-temp");

  const iconElement = obtenerIconoPorDescripcion(descripcion);
  iconAndTempContainer.appendChild(iconElement);

  const temperatureActElement = document.createElement("div");
  temperatureActElement.classList.add("capital-item", "temperatureAct");
  temperatureActElement.textContent = "\\("+ temperatura + "ºC\\)";
  iconAndTempContainer.appendChild(temperatureActElement);

  tarjeta.appendChild(iconAndTempContainer);

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("capital-item", "description");
  descriptionElement.textContent = descripcion;
  tarjeta.appendChild(descriptionElement);

  const temperatureRangeElement = document.createElement("div");
  temperatureRangeElement.classList.add("capital-item", "temperature-range");

  const temperaturaMaxElement = document.createElement("div");
  temperaturaMaxElement.classList.add("temperature");
  temperaturaMaxElement.textContent = "MAX: \\(" + temperaturaMax + "ºC\\)";
  temperatureRangeElement.appendChild(temperaturaMaxElement);

  const temperaturaMinElement = document.createElement("div");
  temperaturaMinElement.classList.add("temperature");
  temperaturaMinElement.textContent = "MIN: \\(" + temperaturaMin + "ºC\\)";
  temperatureRangeElement.appendChild(temperaturaMinElement);
  tarjeta.appendChild(temperatureRangeElement);

  const lineaElement = document.createElement("div");
  lineaElement.classList.add("capital-item", "weather-info");

  const lluviaElement = document.createElement("div");
  lluviaElement.classList.add("info-item", "lluvia");
  if (lluvia === ''){
    lluvia = 0;
  }
  lluviaElement.textContent = "Lluvia: \\(" + lluvia + " l/m^2\\)";
  lineaElement.appendChild(lluviaElement);

  // prob lluvia
  const probLluviaElement = document.createElement("div");
  probLluviaElement.classList.add("info-item", "prob-lluvia");
  probLluviaElement.textContent = "Prob. lluvia: \\(" + probLluvia + "\\%\\)";
  lineaElement.appendChild(probLluviaElement);

  // Humedad
  const humedadElement = document.createElement("div");
  humedadElement.classList.add("info-item", "humedad");
  humedadElement.textContent = "Humedad: \\(" + humedad + "\\%\\)";
  lineaElement.appendChild(humedadElement);

  // Viento
  const vientoElement = document.createElement("div");
  vientoElement.classList.add("info-item", "viento");
  vientoElement.textContent = "Viento: \\(" + viento + " km/h N\\)";
  lineaElement.appendChild(vientoElement);
  tarjeta.appendChild(lineaElement);

  return tarjeta;
}

window.onload = function() {
  completarDatalist();
  const municipioPredeterminado = localStorage.getItem('municipioPredeterminado');
  if (municipioPredeterminado !== '' && municipioPredeterminado !== null && municipioPredeterminado !== undefined) {
    searchWeather(municipioPredeterminado)
  } else {
    // Si no hay un municipio predeterminado, muestra las capitales destacadas
    obtenerCiudadesDestacadas();
  }
};

