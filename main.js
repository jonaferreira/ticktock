import Flipper from './Flipper.js';
import StaticClock from './BlockTime.js';

const clockType = 'Flipper';

const clock = document.getElementById('clock');
const digitNodes = clock.querySelectorAll('[id^="digit"]');
const digits = [];

let lastUpdateTime = new Date();
let lastTimeStr = lastUpdateTime.toTimeString().slice(0, 8).replace(/:/g, '');
let nextTimeStr = new Date(lastUpdateTime.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

digitNodes.forEach((node, i) => {
  if (clockType === 'Flipper') {
    const formatDigit = new Flipper({
      node,
      frontText: 'number' + lastTimeStr[i],
      backText: 'number' + nextTimeStr[i]
    });

    digits.push(formatDigit);
  } else if (clockType === 'BlockTime') {
    const digit = new StaticClock({
      node,
      text: lastTimeStr[i],
    });
    digits.push(digit);
  }
});

async function updateClock() {
  const now = new Date();
  const nowTimeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');

  if (clockType === 'Flipper') {
    const updatePromises = digits.map((digit, i) =>
      digit.update(lastTimeStr[i], nowTimeStr[i])
    );
    await Promise.all(updatePromises);
  } else if (clockType === 'BlockTime') {
    digits.forEach((digit, i) => {
      digit.update(nowTimeStr[i]);
    });
  }

  lastUpdateTime = now;
  lastTimeStr = nowTimeStr;
}



/** Reiniciar el reloj cuando se vuelva a hacer visible */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    syncClock(); // Actualiza el estado del reloj inmediatamente
  }
});

function syncClock() {
  const now = new Date();
  const nowTimeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const nextTimeStr = new Date(now.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

  digits.forEach((digit, i) => {
    if (clockType === 'Flipper') {
      digit.reset('number' + nowTimeStr[i], 'number' + nextTimeStr[i]);
    } else if (clockType === 'BlockTime') {
      console.log("Reiniciar otro reloj")
    }
  });

  lastUpdateTime = now;
  lastTimeStr = nowTimeStr;
}




// Usar setInterval para actualizar cada segundo
setInterval(updateClock, 1000);
