let resultado = null;
let sudoku = null;
let nivel = null;
let estudiante = null;
let fallas = 0;
let salir=document.getElementById("salir");

const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    nivel = document.getElementById('nivel').value;
    document.getElementById("sudoku").hidden = false;
    document.getElementById("cronometro").hidden = false;
    document.getElementById("jugar").disabled = true;
    document.getElementById("finalizar").disabled = false;
    const respuesta = await fetch('http://localhost:5000/api/loginJuego', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, nivel })
    });
    salir.textContent="Salir";
    const datos = await respuesta.json();
    alert(datos['mensaje']);
    const entrada = document.getElementById('entrada');
    entrada.textContent = datos['mensaje'];
    entrada.style.color="blue";
    entrada.textAlign="center";
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    sudoku = datos['tablero'];
    resultado = datos['resultado'];
    estudiante = datos['item'];
    let miparticipacion = datos['participacion'];
    reiniciarCronometro()
    iniciarCronometro();
    let color_1=['green','pink',"white","salmon","coral","plum","teal","aqua"];//grey
    let color_2=['orange','yellow','beige',"grey","gold","khaki","silver"];
    let azar_1=color_1[Math.floor(Math.random() * color_1.length)];
    let azar_2=color_2[Math.floor(Math.random() * color_2.length)];
    let color = [azar_1,azar_2];
    for (let i = 0; i < sudoku.length; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < sudoku[i].length; j++) {
            let celdaValor = document.createElement('td');
            celdaValor.style.border="1px solid black";
            celdaValor.style.width = "40px";
            celdaValor.style.height = "40px";
            if (sudoku[i][j] !== 0) {
                celdaValor.textContent = sudoku[i][j];
                celdaValor.style.textAlign = "center";
                celdaValor.style.fontSize = "25px";
                if (((i < 3 || i > 5) && (j < 3 || j > 5)) || ((i < 6 && i > 2) && (j < 6 && j > 2))) {
                    celdaValor.style.background = color[0];
                }
                else {
                    celdaValor.style.background = color[1];
                }
                fila.appendChild(celdaValor);
            }
            else {
                const input = document.createElement('input');
                input.setAttribute("maxlength", "1");
                input.setAttribute("type", "text");
                //input.setAttribute("width","50")
                input.style.width = "40px";
                input.style.height = "40px";
                input.style.textAlign = "center";
                input.style.fontSize = "25px";
                input.style.border="0px solid blue";
                if (((i < 3 || i > 5) && (j < 3 || j > 5)) || ((i < 6 && i > 2) && (j < 6 && j > 2))) {
                    input.style.background = color[0];
                }
                else {
                    input.style.background = color[1];
                }
                input.dataset.fila = i;
                input.dataset.col = j;
                input.addEventListener("input", function () {
                    const value = this.value;
                    let f = this.dataset.fila;
                    let c = this.dataset.col;
                    if (!/^[1-9]$/.test(value)) {
                        this.value = '';
                    }
                    else if (resultado[f][c] == value) {
                        this.style.color = "blue";
                        this.value = resultado[f][c];
                    }
                    else {
                        this.style.color = "red";
                        fallas = fallas + 1;
                        document.getElementById("fallas").textContent ="ERROR: "+ fallas;
                    }
                });
                celdaValor.appendChild(input)
                fila.appendChild(celdaValor)
            }
        }
        tabla.appendChild(fila)
    }
    document.getElementById("tablainforme").hidden=false;
   
    let gestion = document.getElementById('jajatabla');
    const lista = document.getElementById('lista');
    gestion.innerHTML = '';
    for (let i = 0; i < miparticipacion.length; i++) {

        let fila = document.createElement('tr');
        let columna = miparticipacion[i];

        let celdaItem = document.createElement('td');
        celdaItem.textContent = i + 1;
        fila.appendChild(celdaItem);

        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = columna.nombre;
        fila.appendChild(celdaNombre);

        let celdaNivel = document.createElement('td');
        celdaNivel.textContent = columna.nivel;
        fila.appendChild(celdaNivel);

        let celdaDuracion = document.createElement('td');
        celdaDuracion.textContent = columna.tiempo;
        fila.appendChild(celdaDuracion);

        let celdaFallas = document.createElement('td');
        celdaFallas.textContent = columna.errado;
        fila.appendChild(celdaFallas);

        let celdaPuntos = document.createElement('td');
        celdaPuntos.textContent = columna.puntos;
        fila.appendChild(celdaPuntos);

        let celdaFecha = document.createElement('td');
        const fecha_hora=new Date(columna.fecha);
        celdaFecha.textContent = fecha_hora.toLocaleString();
        fila.appendChild(celdaFecha);

        gestion.appendChild(fila);
    }

});

