export default class Flipper {
  constructor(config) {
    this.node = config.node;
    this.frontText = config.frontText || 'number0';
    this.backText = config.backText || 'number1';
    this.duration = 600;
    this.isFlipping = false;

    // Establece las clases de los elementos
    this.nodeClass = {
      flip: 'flip',
      front: 'digital front',
      back: 'digital back'
    };

    // Convierte el nodo inicial simple al formato de flip clock
    this._convertNode();

    // Obtiene los nodos del flip
    this.frontNode = this.node.querySelector('.front');
    this.backNode = this.node.querySelector('.back');

    // Inicializa el flip
    this._init();
  }

  _convertNode() {
    const frontDiv = document.createElement('div');
    frontDiv.className = `${this.nodeClass.front} ${this.frontText}`;

    const backDiv = document.createElement('div');
    backDiv.className = `${this.nodeClass.back} ${this.backText}`;

    const flipDiv = document.createElement('div');
    flipDiv.className = `${this.nodeClass.flip} down`;
    flipDiv.appendChild(frontDiv);
    flipDiv.appendChild(backDiv);

    // Reemplaza el contenido actual del nodo con el nuevo flip
    this.node.innerHTML = '';
    this.node.appendChild(flipDiv);
  }

  _init() {
    this._setFront(this.frontText);
    this._setBack(this.backText);
  }

  _setFront(className) {
    this.frontNode.setAttribute('class', `${this.nodeClass.front} ${className}`);
  }

  _setBack(className) {
    this.backNode.setAttribute('class', `${this.nodeClass.back} ${className}`);
  }

  _flip(type, front, back) {
    if (this.isFlipping) {
      return false;
    }

    this.isFlipping = true;
    setTimeout(() => this._setFront(front), this.duration);
    this._setBack(back);

    const flipClass = `${this.nodeClass.flip} ${type}`;
    this.node.querySelector('.flip').setAttribute('class', `${flipClass} go`);

    setTimeout(() => {
      this.node.querySelector('.flip').setAttribute('class', flipClass);
      this.isFlipping = false;
      this._setFront(back);
    }, this.duration);
  }

  async update(current, next) {
    if (current !== next) {
      this._flip('down', `number${current}`, `number${next}`);
    }
  }

  reset(front, back) {
    this.isFlipping = false;
    this._setFront(front);
    this._setBack(back);
  }

  flipDown(front, back) {
    this._flip('down', front, back);
  }

  flipUp(front, back) {
    this._flip('up', front, back);
  }
}