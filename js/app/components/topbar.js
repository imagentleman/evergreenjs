function template(props) {
  return `
    <div class="top-bar">
      <a class="menu"
         href="">
        <img alt="menu"
             class="menu-icon"
             src="${props.openImage}">
      </a>

      <img alt="logo"
           class="logo"
           src="${props.logoImage}">

      <a class="close"
         href="">
        <img alt="close"
             class="close-icon"
             src="${props.closeImage}">
      </a>
    </div>
  `;
}

function styles() {
  return `
    <style>
      .top-bar {
        background: var(--magenta);
        display: flex;
      }

        .menu {
          display: inline-block;
        }

          .menu-icon,
          .close-icon {
            display: block;
            height: 6rem;
            width: 7.2rem;
          }

        .close {
          display: none;
          margin-left: auto;
        }

        .logo {
          display: none;
          height: 2rem;
          padding: 2rem 2.4rem;
          width: 5rem;
        }

          .logo.visible {
            display: inline-block;
          }

      @media (min-width: 768px) {
        .top-bar {
          display: none;
        }

          .menu {
            display: none;
          }
      }
    </style>
  `;
}

class TopBar {
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
    this.shadow.querySelector('.menu').addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      document.body.classList.toggle('nav-active');
    });

    this.shadow.querySelector('.close').addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      document.body.classList.remove('nav-active');
    });
  }

  _render() {
    this.shadow.innerHTML = TopBar.getStyles() +
      TopBar.getTemplate(this);
  }

  _mount() {
    this.shadow = this.element.shadowRoot || this.element.createShadowRoot();

    this._render();
  }
}

module.exports = TopBar;
