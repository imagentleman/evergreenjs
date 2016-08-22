function template(props) {
  return `
    <section class="headline">
      <h1>
        ${props.title}
      </h1>
    </section>
  `;
}

function styles() {
  return `
    <style>
      .headline {
        margin: 5rem;
        text-align: center;
      }

        .headline h1 {
          cursor: pointer;
          max-width: 15ch;
          transition: all .42s var(--animation-timing);
        }

        .headline h1:hover {
          color: var(--green);
        }

        .headline h1.active {
          color: var(--green);
        }

      @media (min-width: 768px) {
        .headline {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 48rem;
          margin: 0;
          top: 0;
          width: 100%;
        }

        .headline h1 {
          color: var(--dark-gray);
          text-align: center;
        }
      }
    </style>
  `;
}

class Headline {
  constructor(element) {
    Object.assign(this, element.dataset);

    this.element = element;
    this._mount();
    this._attachListeners();
  }

  static getTemplate(self) {
    return template(self);
  }

  static getStyles(self) {
    return styles(self);
  }

  _attachListeners() {
    const headings = this.shadow.querySelectorAll('.headline h1');

    for (const h of headings) {
      h.addEventListener('click', e => {
        e.target.classList.toggle('active');
      });
    }
  }

  _render() {
    const title = app.store.getValue('data') ?
      app.store.getValue('data')['headlines'][this.key] :
      {};

    this.shadow.innerHTML = Headline.getStyles() +
      Headline.getTemplate({
        title
      });
  }

  _mount() {
    this.shadow = this.element.shadowRoot || this.element.createShadowRoot();

    this._render();
  }
}

module.exports = Headline;
