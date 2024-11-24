class Flipper {
  constructor(config) {
    this.node = config.node;
    this.frontText = config.frontText || 'number0';
    this.backText = config.backText || 'number1';
    this.duration = config.duration || 600;
    this.isFlipping = false;

    // Establece las clases de los elementos
    this.nodeClass = {
      flip: 'flip',
      front: 'digital front',
      back: 'digital back'
    };

    // Obtiene los nodos del flip
    this.frontNode = this.node.querySelector('.front');
    this.backNode = this.node.querySelector('.back');

    // Inicializa el flip
    this._init();
  }

  _init() {
    this._setFront(this.frontText);
    this._setBack(this.backText);
  }

  _setFront(className) {
    this.frontNode.setAttribute('class', this.nodeClass.front + ' ' + className);
  }

  _setBack(className) {
    this.backNode.setAttribute('class', this.nodeClass.back + ' ' + className);
  }

  _flip(type, front, back) {
    if (this.isFlipping) {
      return false;
    }

    this.isFlipping = true;
    this._setFront(front);
    this._setBack(back);

    let flipClass = this.nodeClass.flip;
    if (type === 'down') {
      flipClass += ' down';
    } else {
      flipClass += ' up';
    }

    this.node.setAttribute('class', flipClass + ' go');

    setTimeout(() => {
      this.node.setAttribute('class', flipClass);
      this.isFlipping = false;
      this._setFront(back);
    }, this.duration);
  }

  flipDown(front, back) {
    this._flip('down', front, back);
  }

  flipUp(front, back) {
    this._flip('up', front, back);
  }
}

// Ejemplo de uso de la clase Flipper en un reloj
const clock = document.getElementById('clock');
const flips = clock.querySelectorAll('.flip');
const now = new Date();
const nowTimeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
const nextTimeStr = new Date(now.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

const flipObjs = [];

for (let i = 0; i < flips.length; i++) {
  flipObjs.push(new Flipper({
    node: flips[i],
    frontText: 'number' + nowTimeStr[i],
    backText: 'number' + nextTimeStr[i],
    duration: 600
  }));
}

setInterval(function () {
  const now = new Date();
  const nowTimeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const nextTimeStr = new Date(now.getTime() + 1000).toTimeString().slice(0, 8).replace(/:/g, '');

  for (let i = 0; i < flipObjs.length; i++) {
    if (nowTimeStr[i] === nextTimeStr[i]) {
      continue;
    }
    flipObjs[i].flipDown('number' + nowTimeStr[i], 'number' + nextTimeStr[i]);
  }
}, 1000);
