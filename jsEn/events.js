// Asigna la función al evento clic del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', () => {
    const municipio = document.getElementById('ciudadBuscador').value;
    searchWeather(municipio);
});

// Botones
document.getElementById('obtenerEn').addEventListener('click', obtenerCiudadesDestacadas);
document.getElementById('guardarEn').addEventListener('click', guardarComoPredeterminado);

document.getElementById('ciudadBuscador').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});





















