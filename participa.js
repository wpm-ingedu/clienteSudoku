function finaliza() {
    const tabla = document.getElementById('tabla');
    const filas = tabla.rows;
    let salida = '';
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].cells;
        for (let j = 0; j < celdas.length; j++) {
            const celda = celdas[j];
            const input = celda.querySelector('input');
            if (input && input.value == resultado[i][j]) {
                salida = salida + input.value;
            } else {
                salida = salida + celda.textContent;
            }
        }
    }
    const puntaje = (40 - (temporal / 90) - 2*fallas + 1) * (0.5);
    if (salida.length == 81) {
        tiempo = document.getElementById("tiempo").textContent;
        fetch('http://localhost:5000/api/participacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "sudoku": sudoku, "resultado": resultado, "tiempo": tiempo, "nivel": nivel, "estudiante": estudiante, "puntaje": puntaje, "fallas": fallas })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('solucion').textContent = 'Servidor: ' + data.mensaje;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        pausarCronometro();
        document.getElementById("finalizar").disabled = true;
        document.getElementById("jugar").disabled = false;
        document.getElementById("puntaje").textContent = "PUNTOS OBTENIDOS: " + puntaje;
    }
}
