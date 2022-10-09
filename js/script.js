const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

//Arrays

const arrletrasMinus = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrletrasMayus = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrSimbolos = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "-", "+", "="]

//variables

const $$longitud = $$(".longitud")
const $$reglas = $$(".reglas")
const $mayusculas = $(".mayusculas")
const $minusculas = $(".minusculas")
const $numeros = $(".numeros")
const $simbolos = $(".simbolos")
const $contrasenia = $("#contrasenia")
const $btnCrear = $("#botonCrear")
const $btnCopiar = $("#botonCopiar")
const $btnRecargar = $("#botonRecargar")
const $ventanaModal = $("#ventanaModal")

//funciones

const longitudElegida = () => {
    for (radio of $$longitud) {
        if (radio.checked) {
            const longitud = radio.value
            return parseInt(longitud)
        }
    }
}

const reglasElegidas = () => {
    for (regla of $$reglas) {
        if (regla.checked) {
            return regla.value
        }
    }

}

const caracteresElegidos = () => {
    if (reglasElegidas() === "soloLetras") {
        $mayusculas.removeAttribute("disabled")
        $minusculas.removeAttribute("disabled")
        $mayusculas.checked = true
        $minusculas.checked = true
        $numeros.setAttribute("disabled", "")
        $numeros.checked = false
        $simbolos.setAttribute("disabled", "")
        $simbolos.checked = false
    }
    if (reglasElegidas() === "soloNumeros") {
        $numeros.removeAttribute("disabled")
        $numeros.checked = true
        $mayusculas.setAttribute("disabled", "")
        $mayusculas.checked = false
        $minusculas.setAttribute("disabled", "")
        $minusculas.checked = false
        $simbolos.setAttribute("disabled", "")
        $simbolos.checked = false
    }
    if (reglasElegidas() === "todosLosCaracteres") {
        $mayusculas.removeAttribute("disabled")
        $minusculas.removeAttribute("disabled")
        $numeros.removeAttribute("disabled")
        $simbolos.removeAttribute("disabled")
        $mayusculas.checked = true
        $minusculas.checked = true
        $simbolos.checked = true
        $numeros.checked = true
    }
}

let arrAleatorio = []
const xAleatorio = (array) => {
    const x = Math.floor(Math.random() * array.length)
    arrAleatorio.push(array[x])
}

const generarContraseniaLarga = () => {
    for (let i = 0; i < 20; i++) {
        xAleatorio(arrletrasMinus)
        xAleatorio(arrletrasMayus)
        xAleatorio(arrNumeros)
        xAleatorio(arrSimbolos)
    }
}

//generar contraseña

const contraseniaLargaFiltrada = () => {
    if (!$mayusculas.checked) {
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrletrasMayus.includes(item)
        })
    }
    if (!$minusculas.checked) {
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrletrasMinus.includes(item)
        })
    }
    if (!$numeros.checked) {
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrNumeros.includes(item)
        })
    }
    if (!$simbolos.checked) {
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrSimbolos.includes(item)
        })
    }

}
let contraseniaCortada
const generarContraseniaCortada = () => {
    if (longitudElegida() === undefined) {
        console.log("nada esta check")
        alert("Debe seleccionar una opcion")
    }
    if (longitudElegida() === 12) {
        contraseniaCortada = arrAleatorio.slice(0, 12)

    }
    if (longitudElegida() === 9) {
        contraseniaCortada = arrAleatorio.slice(0, 9)

    }
    if (longitudElegida() === 6) {
        contraseniaCortada = arrAleatorio.slice(0, 6)

    }
}
const randomizar = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } return array
}

let contraseniaFinal
const generarContraseniaFinal = () => {
    arrAleatorio = []
    generarContraseniaLarga()
    contraseniaLargaFiltrada()
    generarContraseniaCortada()
    contraseniaFinal = randomizar(contraseniaCortada)
    return $contrasenia.innerHTML = contraseniaFinal.join("")
}

// eventos 

const reglasFuncionalidad = () => {
    for (regla of $$reglas) {
        regla.addEventListener("change", () => {
            caracteresElegidos()
        })
    }
}

reglasFuncionalidad()


$btnCrear.addEventListener("click", (evento) => {
    if (longitudElegida() === undefined) {
        evento.preventDefault()
        return alert("Debe seleccionar una opcion")
    }
    evento.preventDefault()
    generarContraseniaFinal()
})

$btnRecargar.addEventListener("click", (evento) => {
    if (longitudElegida() === undefined) {
        evento.preventDefault()
        return alert("Debe seleccionar una opcion")
    }
    evento.preventDefault()
    generarContraseniaFinal()
})

$btnCopiar.addEventListener("click", (e) => {
    e.preventDefault()
    let textToCopy = $contrasenia.innerText
    navigator.clipboard.writeText(textToCopy)
    $ventanaModal.style.display = "block"
    setTimeout(modal => {
        $ventanaModal.style.display = "none"
    }, 1000)
})


