let tarjetasDestapadas = 0;
let tarjeta1 = ' ';
let tarjeta2 = ' ';
let primerResultado = null;
let segundoResultado = null;
let movimiento = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let timer1 = 45;
let tiemporegresivo = null;

let mostrarMovimiuentos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("tiempo")
let h1 = document.getElementById("h1")
let reiniciar = document.getElementById("reiniciar");

let winAudio = new Audio('./sound/win.wav')
let loseAudio = new Audio('./sound/lose.wav')
let nosonigualesAudio = new Audio('./sound/nosoniguales.wav')
let sonigualesAudio = new Audio('./sound/soniguales.wav')
let priemerresultadoAudio = new Audio('./sound/primerresultado.wav')

reiniciar.addEventListener('click', () => {
    location.reload();
});

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

function contartiempo() {
    tiemporegresivo = setInterval(() => {
        timer--
        mostrarTiempo.innerHTML = ` Tiempo ${timer} segundos`
        if (timer == 0) {
            h1.innerText = `Fin del juego`
            clearInterval(tiemporegresivo);
            bloquearTarjetas()
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        loseAudio.play()
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt"">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {

    if (temporizador == false) {
        contartiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt"">`;
        priemerresultadoAudio.play()
        tarjeta1.disabled = true
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt"">`;

        tarjeta2.disabled = true

        movimiento++;
        mostrarMovimiuentos.innerHTML = `Movientos:${movimiento}`
        if (primerResultado == segundoResultado) {

            sonigualesAudio.play()
            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos:${aciertos}`;

            if (aciertos == 8) {

                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🤩`
                mostrarMovimiuentos.innerHTML = `Movientos: ${movimiento} 😼`
                clearInterval(tiemporegresivo);
                mostrarTiempo.innerHTML = ` Te demoraste tan solo  ${timer1 - timer} segundos 😄`
                winAudio.play()
            }
        } else {
            nosonigualesAudio.play()
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800)
        }
    }
}