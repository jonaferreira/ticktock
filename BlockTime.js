export default class StaticClock {
  constructor(config) {
    this.node = config.node;
    this.text = config.text || '0';

    this._init();
  }

  _init() {
    this.node.textContent = this.text;
    this.node.style.backgroundColor = 'black';
    this.node.style.color = 'white';
    this.node.style.fontSize = '10rem';
    this.node.style.textAlign = 'center';
    this.node.style.padding = '10px';
    this.node.style.borderRadius = '5px';
    this.node.style.width = '8rem';
    this.node.style.height = '16rem';
    this.node.style.display = 'flex';
    this.node.style.alignItems = 'center';
    this.node.style.justifyContent = 'center';
  }

  update(current) {
    this.node.textContent = current;
  }
}