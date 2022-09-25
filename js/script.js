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

//funciones

const longitudElegida = () => {
    console.log("se ejecuto longitud elegida")
    for (radio of $$longitud) {
        if (radio.checked) {
            const longitud = radio.value
            return parseInt(longitud)
        }
    }
}

const reglasElegidas = () => {
    console.log("se ejecuto reglas elegidas")
    for (regla of $$reglas) {
        if (regla.checked) {
            return regla.value
        }
    }

}

const caracteresElegidos = () => {
    console.log("se ejecuto caracteres elegida")
    if (reglasElegidas() === "soloLetras") {
        $mayusculas.removeAttribute("disabled")
        $minusculas.removeAttribute("disabled")
        $numeros.setAttribute("disabled", "")
        $numeros.checked = false
        $simbolos.setAttribute("disabled", "")
        $simbolos.checked = false
    }
    if (reglasElegidas() === "soloNumeros") {
        $numeros.removeAttribute("disabled")
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
    }
}

let arrAleatorio = []
const xAleatorio = (array) => {
    const x = Math.floor(Math.random() * array.length)
    arrAleatorio.push(array[x])
}

const generarContraseniaLarga = () => {
    console.log("se ejecuto generarcontrasenialarga")
    for (let i = 0; i < 20; i++) {
        xAleatorio(arrletrasMinus)
        xAleatorio(arrletrasMayus)
        xAleatorio(arrNumeros)
        xAleatorio(arrSimbolos)
    }
}

//generar contraseña

const contraseniaLargaFiltrada = () => {
    console.log("se ejecuto contrasenialargafiltrada")
    if (!$mayusculas.checked) {
        console.log("entre al if mayus")
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrletrasMayus.includes(item)
        })
    }
    if (!$minusculas.checked) {
        console.log("entre al if minus")
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrletrasMinus.includes(item)
        })
    }
    if (!$numeros.checked) {
        console.log("entre al if numeros")
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrNumeros.includes(item)
        })
    }
    if (!$simbolos.checked) {
        console.log("entre al if simbolos")
        arrAleatorio = arrAleatorio.filter(item => {
            return !arrSimbolos.includes(item)
        })
    }

}
let contraseniaCortada
const generarContraseniaCortada = () => {
    console.log("se ejecuto generarcontraseniacortada")
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
    console.log("se ejecuto generar contraseniafinal")
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
    evento.preventDefault()
    generarContraseniaFinal()
})

$btnRecargar.addEventListener("click", (evento) => {
    evento.preventDefault()
    generarContraseniaFinal()
})

$btnCopiar.addEventListener("click", (e) => {
    e.preventDefault()
    let textToCopy = $contrasenia.innerText
    navigator.clipboard.writeText(textToCopy)
    alert("copiado en el portapapeles")
})
