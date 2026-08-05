/**
 * v1ktoff // Webspace - Core Engine
 * Interactividad retro, terminal CLI y renderizado ASCII en tiempo real.
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. SISTEMA DE NAVEGACIÓN Y PROMPT CLI (SPA + Typewriter Effect)
    // =========================================================================
    const navLinks = document.querySelectorAll("nav ul li a");
    let typingTimer = null; // Control para cancelar la animación previa si se da clic rápido

    /**
     * Simula el tipeado letra por letra en un elemento HTML
     */
    function typeEffect(element, text, speed = 30) {
        if (!element) return;
        element.innerHTML = "";
        let i = 0;

        if (typingTimer) clearInterval(typingTimer);

        typingTimer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingTimer);
            }
        }, speed);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // 1.1 Actualizar estado visual del menú activo
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // 1.2 Extraer ID destino (ej. #proyectos -> proyectos)
            const targetId = link.getAttribute("href").substring(1);

            // 1.3 Ocultar todas las secciones
            const sections = document.querySelectorAll("main > section");
            sections.forEach(section => {
                section.style.display = "none";
            });

            // 1.4 Mostrar la sección activa
            const activeSection = document.getElementById(`sec-${targetId}`);
            if (activeSection) {
                activeSection.style.display = "block";

                // 1.5 Efecto Typewriter en el encabezado <h2> principal de la sección
                const h2 = activeSection.querySelector("h2");
                if (h2) {
                    const originalText = h2.getAttribute("data-text") || h2.textContent;
                    if (!h2.getAttribute("data-text")) {
                        h2.setAttribute("data-text", originalText);
                    }
                    typeEffect(h2, originalText, 25);
                }

                console.log(`v1ktoff@webspace:~# cd /${targetId}`);
            }
        });
    });

    // Activar por defecto el primer enlace (_inicio)
    if (navLinks.length > 0) {
        navLinks[0].classList.add("active");
    }

    // =========================================================================
    // 2. WIDGET: STATUS DEL SERVIDOR (Simulación de carga de CPU)
    // =========================================================================
    setInterval(() => {
        const cpuElement = document.getElementById('cpu-load');
        if (cpuElement) {
            const simulatedLoad = (Math.random() * (0.88 - 0.12) + 0.12).toFixed(2);
            cpuElement.innerText = simulatedLoad;
        }
    }, 3000);

    // =========================================================================
    // 3. WIDGET: GLOBE_NET // ANIMACIÓN DEL MUNDO ASCII EN 3D
    // =========================================================================
    const globeContainer = document.getElementById('ascii-globe');

    if (globeContainer) {
        const width = 26;
        const height = 13;
        let angleX = 0;
        let angleY = 0;
        const chars = " .:-=+*#%@";

        function drawGlobe() {
            let output = "";

            for (let j = 0; j < height; j++) {
                let theta = (j / height) * Math.PI;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                for (let i = 0; i < width; i++) {
                    let phi = (i / width) * 2 * Math.PI + angleY;
                    let sinPhi = Math.sin(phi);
                    let cosPhi = Math.cos(phi);

                    let x = sinTheta * cosPhi;
                    let y = cosTheta;
                    let z = sinTheta * sinPhi + 2.2;

                    let noise = Math.sin(x * 3.5 + angleY) * Math.cos(y * 3.5 + angleX) + Math.sin(z * 1.8);

                    if (noise > 0.25) {
                        let charIndex = Math.floor(((noise + 1) / 2) * (chars.length - 1));
                        output += chars[Math.min(charIndex, chars.length - 1)];
                    } else {
                        output += " ";
                    }
                }
                output += "\n";
            }

            globeContainer.innerText = output;
            angleY += 0.035;
            angleX += 0.008;

            requestAnimationFrame(drawGlobe);
        }

        drawGlobe();
    }
});

// =============================================================================
// 4. WIDGET: REPRODUCTOR DE AUDIO FALSO
// =============================================================================
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
