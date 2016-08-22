function template(props) {
  return `
    <section class="content-blade">
      ${props.html}
    </section>
  `;
}

function styles() {
  return `
    <style>
      .content-blade {
        margin: 5rem;
      }

      @media (min-width: 768px) {
        .content-blade {
          margin: 6rem auto;
          max-width: 96.8rem;
        }
      }
    </style>
  `;
}

class Content {
  constructor(element) {
    this.html = element.innerHTML;

    this.element = element;
    this._mount();
  }

  static getTemplate(self) {
    return template(self);
  }

  static getStyles(self) {
    return styles(self);
  }

  _render() {
    this.shadow.innerHTML = Content.getStyles() +
      Content.getTemplate(this);
  }

  _mount() {
    this.shadow = this.element.shadowRoot || this.element.createShadowRoot();

    this._render();
  }
}

module.exports = Content;
