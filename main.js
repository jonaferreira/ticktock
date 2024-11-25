import Flipper from './Flipper.js';

const clock = document.getElementById('clock');
const digitNodes = clock.querySelectorAll('[id^="digit"]');
const digits = [];

let lastUpdateTime = new Date();
let lastTimeStr = lastUpdateTime.toTimeString().slice(0, 8).replace(/:/g, '');
let nextTimeStr = new Date(lastUpdateTime.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

digitNodes.forEach((node, i) => {
  const formatDigit = new Flipper({
    node,
    frontText: 'number' + lastTimeStr[i],
    backText: 'number' + nextTimeStr[i],
    duration: 600
  });

  digits.push(formatDigit);
});

async function updateFlipper() {
  const now = new Date();
  const nowTimeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  let nextTimeStr = new Date(now.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

  // Hacer que las actualizaciones del flip sean asincrónicas
  const flipPromises = digits.map((flip, i) => {
    if (nowTimeStr[i] !== nextTimeStr[i]) {
      return new Promise((resolve) => {
        flip.flipDown('number' + nowTimeStr[i], 'number' + nextTimeStr[i]);
        resolve();
      });
    }
  });

  // Esperar que todas las animaciones terminen antes de continuar
  await Promise.all(flipPromises);

  // Actualizar el tiempo para la siguiente iteración
  lastTimeStr = nowTimeStr;
  nextTimeStr = new Date(now.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');
}

function updateClock() {
  const now = new Date();

  // Si el segundo ha cambiado, actualizamos el flip
  if (now.getSeconds() !== lastUpdateTime.getSeconds()) {
    updateFlipper();
    lastUpdateTime = now;
  }
}

// Usar setInterval para actualizar cada segundo
setInterval(updateClock, 1000);

// Manejar la visibilidad de la pestaña
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    console.log('La pestaña está oculta. Pausando actualizaciones.');
    // Puedes detener cualquier animación o lógica aquí si es necesario.
  } else if (document.visibilityState === 'visible') {
    console.log('La pestaña está visible de nuevo. Reanudando actualizaciones.');
    // Aquí puedes reiniciar el reloj para sincronizar con la hora actual
    const now = new Date();
    lastUpdateTime = now; // Resincronizar el último tiempo
    updateFlipper(); // Actualizar los flips si es necesario
  }
});