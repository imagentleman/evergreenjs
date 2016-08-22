function template() {
  return `
    <div class="hero">
    </div>
  `;
}

function styles(props) {
  return `
    <style>
      .hero {
        background: url(${props.backgroundImage});
        background-size: cover;
        height: 24rem;
      }

      @media (min-width: 768px) {
        .hero {
          height: 64rem;
        }
      }
    </style>
  `;
}

class Hero {
  constructor(element) {
    Object.assign(this, element.dataset);

    this.element = element;
    this._mount();
  }

  static getTemplate() {
    return template();
  }

  static getStyles(self) {
    return styles(self);
  }

  _render() {
    this.shadow.innerHTML = Hero.getStyles(this) + Hero.getTemplate();
  }

  _mount() {
    this.shadow = this.element.shadowRoot || this.element.createShadowRoot();

    this._render();
  }
}

module.exports = Hero;
