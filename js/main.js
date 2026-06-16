/**
 * v1ktoff // Webspace - Core Engine
 * Interactividad retro y renderizado ASCII en tiempo real.
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. SISTEMA DE NAVEGACIÓN ASÍNCRONA (Single Page Application)
    // =========================================================================
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Extraer ID del href (ej. #proyectos -> proyectos)
            const targetId = link.getAttribute("href").substring(1);

            // Ocultar todas las secciones dentro del main
            const sections = document.querySelectorAll("main > section");
            sections.forEach(section => {
                section.style.display = "none";
            });

            // Mostrar la sección activa que corresponda al ID
            const activeSection = document.getElementById(`sec-${targetId}`);
            if (activeSection) {
                activeSection.style.display = "block";

                // Registro estético en consola del navegador
                console.log(`v1ktoff@webspace:~# cd /${targetId}`);
            }
        });
    });

    // =========================================================================
    // 2. WIDGET: STATUS DEL SERVIDOR (Simulación de carga de CPU)
    // =========================================================================
    setInterval(() => {
        const cpuElement = document.getElementById('cpu-load');
        if (cpuElement) {
            // Carga flotante simulada entre 0.12 y 0.88 (estilo UNIX Load Avg)
            const simulatedLoad = (Math.random() * (0.88 - 0.12) + 0.12).toFixed(2);
            cpuElement.innerText = simulatedLoad;
        }
    }, 3000);

    // =========================================================================
    // 3. WIDGET: GLOBE_NET // ANIMACIÓN DEL MUNDO ASCII EN 3D
    // =========================================================================
    const globeContainer = document.getElementById('ascii-globe');

    if (globeContainer) {
        const width = 26;  // Resolución horizontal de la matriz
        const height = 13; // Resolución vertical de la matriz
        let angleX = 0;
        let angleY = 0;

        // Paleta de caracteres para sombreado/densidad estructural de la Tierra
        const chars = " .:-=+*#%@";

        function drawGlobe() {
            let output = "";

            for (let j = 0; j < height; j++) {
                // Latitud en radianes
                let theta = (j / height) * Math.PI;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                for (let i = 0; i < width; i++) {
                    // Longitud en radianes + desplazamiento de rotación
                    let phi = (i / width) * 2 * Math.PI + angleY;
                    let sinPhi = Math.sin(phi);
                    let cosPhi = Math.cos(phi);

                    // Mapeo tridimensional de la superficie esférica
                    let x = sinTheta * cosPhi;
                    let y = cosTheta;
                    let z = sinTheta * sinPhi + 2.2; // Distancia focal simulada

                    // Proyección ortográfica/perspectiva simple
                    let ooZ = 1 / z;

                    // Generar ruido trigonométrico armónico continuo para simular continentes
                    let noise = Math.sin(x * 3.5 + angleY) * Math.cos(y * 3.5 + angleX) + Math.sin(z * 1.8);

                    if (noise > 0.25) {
                        // Asignar densidad de carácter si es "tierra firme"
                        let charIndex = Math.floor(((noise + 1) / 2) * (chars.length - 1));
                        output += chars[Math.min(charIndex, chars.length - 1)];
                    } else {
                        // Espacio en blanco si es "océano"
                        output += " ";
                    }
                }
                output += "\n";
            }

            globeContainer.innerText = output;

            // Velocidades de rotación angular de los ejes
            angleY += 0.035;
            angleX += 0.008;

            // Renderizar frame nativo del navegador de manera eficiente
            requestAnimationFrame(drawGlobe);
        }

        // Ejecutar bucle inicial de gráficos
        drawGlobe();
    }
});

// =============================================================================
// 4. WIDGET: REPRODUCTOR DE AUDIO FALSO (Lógica Global)
// =============================================================================
/**
 * Maneja los clics de la botonera del reproductor simulado alterando el marquee
 * e imprimiendo logs de auditoría en la consola de depuración.
 * @param {string} action - El comando ejecutado (PLAY, PAUSE, PREV, NEXT)
 */
function fakeAction(action) {
    const marquee = document.querySelector('.marquee-container marquee');

    switch (action) {
        case 'PLAY':
            console.log("Winamp Status: Playing 'Crystal Castles - Empathy.mp3'...");
            if (marquee) marquee.start();
            break;

        case 'PAUSE':
            console.log("Winamp Status: Audio stream paused.");
            if (marquee) marquee.stop();
            break;

        case 'PREV':
            console.log("Winamp Warning: Rewind buffer underrun.");
            break;

        case 'NEXT':
            console.log("Winamp Error: Index out of bounds. No multi-track streaming available.");
            break;

        default:
            console.log(`Unknown subsystem command: ${action}`);
    }
}
