function esEntradaValida(valor) {
    // null = cancelación (se maneja aparte). Aquí solo validamos strings.
    if (typeof valor !== "string") return false;
    // Caso 11: "" o solo espacios -> Number("") es 0, pero debe ser inválido.
    if (valor.trim() === "") return false;
    const n = Number(valor);
    // Rechaza "hola", NaN, Infinity, -Infinity (caso 10-11)
    return !Number.isNaN(n) && Number.isFinite(n);
}

function ordenarTresNumeros(a, b, c) {
    const ordenados = [a, b, c].sort((x, y) => x - y);
    return {
        menor: ordenados[0],
        medio: ordenados[1],
        mayor: ordenados[2],
        todosIguales: a === b && b === c
    };
}

function iniciarPrograma() {
    const contenedor = document.getElementById("contenedor-resultados");
    const mensajeEspecial = document.getElementById("mensaje-especial");

    // Si el HTML no tiene los contenedores, no podemos continuar (evita crash en el catch)
    if (!contenedor || !mensajeEspecial) {
        console.error("Error: No se encontraron los contenedores en el DOM.");
        return;
    }

    try {
        let raw1 = prompt("Ingresa el primer número:");
        let raw2 = prompt("Ingresa el segundo número:");
        let raw3 = prompt("Ingresa el tercer número:");

        if (raw1 === null || raw2 === null || raw3 === null) {
            contenedor.innerHTML = "";
            mensajeEspecial.innerHTML = `
                <div class="mensaje-error">
                     Cancelaste la operación.
                    <br>
                    <button class="btn-reintentar" onclick="location.reload()"> Reintentar</button>
                </div>
            `;
            return;
        }

        if (!esEntradaValida(raw1) || !esEntradaValida(raw2) || !esEntradaValida(raw3)) {
            console.error("Error: Valores ingresados no son números.");
            contenedor.innerHTML = "";
            mensajeEspecial.innerHTML = `
                <div class="mensaje-error">
                     Error: Ingresa solo números válidos.
                    <br>
                    <button class="btn-reintentar" onclick="location.reload()"> Reintentar</button>
                </div>
            `;
            return;
        }

        const num1 = Number(raw1);
        const num2 = Number(raw2);
        const num3 = Number(raw3);

        console.log("Números ingresados:", num1, num2, num3);

        const { menor, medio, mayor, todosIguales } = ordenarTresNumeros(num1, num2, num3);

        console.log("Ordenados:", menor, medio, mayor);

        if (todosIguales) {
            console.log("Los tres números son iguales.");
            mensajeEspecial.innerHTML = `
                <div class="mensaje-iguales">
                     ¡Los tres números son iguales! (${num1})
                </div>
            `;
        } else {
            // Limpiar mensaje anterior para no dejar "iguales" obsoleto en re-ejecuciones
            mensajeEspecial.innerHTML = "";
        }

        contenedor.innerHTML = `
            <div class="resultado-box">
                <strong> De mayor a menor:</strong> ${mayor}, ${medio}, ${menor}
            </div>
            <div class="resultado-box">
                <strong> De menor a mayor:</strong> ${menor}, ${medio}, ${mayor}
            </div>
        `;

    } catch (error) {
        console.error("Error inesperado:", error);
        mensajeEspecial.innerHTML = `
            <div class="mensaje-error">
                 Ocurrió un error inesperado.
                <br>
                <button class="btn-reintentar" onclick="location.reload()"> Reintentar</button>
            </div>
        `;
    }
}

if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("DOMContentLoaded", iniciarPrograma);
}

// Export para pruebas en Node (no afecta al navegador)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = { esEntradaValida, ordenarTresNumeros };
}
