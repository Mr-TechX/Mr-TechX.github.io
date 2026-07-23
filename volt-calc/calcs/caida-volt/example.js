alert("NOTA: Al ingresar calibres como 1/0, 2/0 y 3/0, favor de escribirlos de la siguiente manera {010 , 020, 030} para asi poder identificarlos en el sistema");
function mostrarDatos() {
    // FORMULA (RESISTENCIA * DISTANCIA) * AMPERAJE
    // const voltaje = document.getElementById('voltaje').value;
    // Resistencias por calibre en ohms/m
    const cal3_0 = 0.000611;
    const cal2_0 = 0.000772;
    const cal1_0 = 0.000983;
    const cal3 = 0.002028;
    const cal4 = 0.002539;
    const cal6 = 0.004104;
    const cal8 = 0.00651;
    const cal10 = 0.01015;
    const cal12 = 0.01614;
    const cal14 = 0.02568;
    const cal16 = 0.04082;
    
    var amperaje = document.getElementById('amperaje').value;
    var calibre = document.getElementById('calibre').value;
    var distancia = document.getElementById('distancia').value;
    var resultado = 0;

    if(calibre == 030 || calibre == 3_0 || calibre == 3/0 || calibre == 3-0 || calibre == 3.0) {
        resultado = cal3_0 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 020 || calibre == 2_0 || calibre == 2/0 || calibre == 2-0 || calibre == 2.0) {
        resultado = cal2_0 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 010 || calibre == 1_0 || calibre == 1/0 || calibre == 1-0 || calibre == 1.0) {
        resultado = cal1_0 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 3) {
        resultado = cal3 * distancia;
        resultado = resultado * amperaje;
    } else  if(calibre == 4) {
        resultado = cal4 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 6) {
        resultado = cal6 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 8) {
        resultado = cal8 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 10) {
        resultado = cal10 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 12) {
        resultado = cal12 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 14) {
        resultado = cal14 * distancia;
        resultado = resultado * amperaje;
    } else if(calibre == 16) {
        resultado = cal16 * distancia;
        resultado = resultado * amperaje;
    } else {
        alert("Este calibre no esta en la base de datos por ahora");
        alert("Los calibres disponibles son: 3_0, 2_0, 1_0, 3, 4, 6, 8, 10, 12, 14, 16");
    }


    var redondeado = parseFloat(resultado.toFixed(2));
    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
        <h3>Caida de voltaje (ΔV):</h3>
        <p><strong>Resultado:</strong> ${redondeado} V</p>
    `;
}

 function redireccionar() {
    window.location.href = "../index.html";
}

function recargar() {
    location.reload();
}
