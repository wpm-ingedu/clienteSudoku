let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo = null;
let enMarcha = false;
let temporal=0;
function actualizarPantalla() {
    const formato = (num) => String(num).padStart(2, '0');
    document.getElementById('tiempo').textContent =
        `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
}
function iniciarCronometro() {
    if (!enMarcha) {
        intervalo = setInterval(() => {
            segundos++;
            temporal++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
                if (minutos === 60) {
                    minutos = 0;
                    horas++;
                }
            }
            actualizarPantalla();
        }, 1000);
        enMarcha = true;
    }
}

function pausarCronometro() {
    clearInterval(intervalo);
    enMarcha = false;
}
function reiniciarCronometro() {
    clearInterval(intervalo);
    segundos = 0;
    minutos = 0;
    horas = 0;
    enMarcha = false;
    temporal=0;
    actualizarPantalla();
}