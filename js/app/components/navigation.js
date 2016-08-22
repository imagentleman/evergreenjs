function template(props, logoImage) {
  const getSubNavigationItems = function(item) {
    let subNavigationItems = '';

    if (item.items.length) {
      subNavigationItems = `
        <ul class="secondary-navigation">
        ${item.items.map(subItem =>
          `<li><a href="${subItem.url}">${subItem.label}</a>`
        ).join('')}
        </ul>`;
    }

    return subNavigationItems;
  };

  let navigationItems = '';

  if (props && props.items) {
    navigationItems = props.items.map(item =>
      `<li class="navigation-item">
        <a class="primary-anchor"
           href="${item.url}">${item.label}</a>

        ${getSubNavigationItems(item)}`
    ).join('');
  }

  return !props ? '' : `
    <ul class="primary-navigation">
      <li class="navigation-item">
        <a class="logo-navigation"
           href="/">
          <img alt="home"
               src="${logoImage}">
        </a>

      ${navigationItems}
      <li class="copyright">© 2014 Huge. All Rights Reserved.</li>
    </ul>
  `;
}

function styles() {
  return `
    <style>
      .primary-navigation {
        background: white;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 7.2rem);
        overflow: auto;
        padding: 1.2rem 0;
        transform: translate3d(-100%, 0, 0);
        transition: transform .42s var(--animation-timing);
        width: calc(100% - 7.2rem);
      }

        .primary-navigation .logo-navigation {
          display: none;
        }

        .navigation-item {
          display: inline-block;
          font-family: HUGEAvantGardeBold, sans-serif;
          font-size: 2.1rem;
          position: relative;
          transition: background .42s var(--animation-timing);
        }

          .navigation-item:hover {
            background: var(--light-gray);
          }

          .active > .primary-anchor {
            background: white;
            color: var(--magenta);
          }

          .active > .secondary-navigation li {
            display: block;
          }

          .active > .secondary-navigation::before {
            transform: rotate(-45deg);
            top: 3.2rem;
          }

        .primary-navigation a {
          color: black;
          display: block;
          line-height: 2.4rem;
          padding: 2.4rem;
          transition: background .42s var(--animation-timing),
                      color .42s var(--animation-timing);
        }

        .secondary-navigation {
          background: white;
        }

          .secondary-navigation::before {
            border-right: .4rem solid var(--magenta);
            border-top: .4rem solid var(--magenta);
            content: '';
            height: 1.2rem;
            position: absolute;
            right: 1.8rem;
            top: 2.4rem;
            transform: rotate(135deg);
            transition: transform .42s var(--animation-timing),
                        top .42s var(--animation-timing);
            width: 1.2rem;
          }

          .secondary-navigation li {
            display: none;
            font-family: Galaxie, serif;
            font-size: 1.6rem;
          }

          .primary-navigation .secondary-navigation a {
            color: black;
            padding: 1.2rem 2.4rem;
            white-space: nowrap;
          }

            .primary-navigation .secondary-navigation a:hover {
              background: var(--light-gray);
              color: var(--magenta);
            }

        .copyright {
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 1.2rem;
          line-height: 4.8rem;
          margin: auto 0 0 2.4rem;
        }

      @media (min-width: 768px) {
        .primary-navigation {
          background: var(--magenta);
          flex-direction: row;
          height: auto;
          overflow: visible;
          padding: 0;
          transform: none;
          width: 100%;
        }

          .primary-navigation a {
            color: white;
          }

            .primary-navigation a:hover {
              background: white;
              color: var(--magenta);
            }

          .primary-navigation .logo-navigation {
            display: inline-block;
            height: 2.4rem;
            padding-right: 2.4rem;
            width: 6rem;
          }

            a.logo-navigation:hover{
              background: var(--magenta);
            }

            .logo-navigation img {
              height: 2.4rem;
              width: 6rem;
            }

          .secondary-navigation {
            padding: 1.2rem 0;
            position: absolute;
          }

            .secondary-navigation::before {
              display: none;
            }

          .primary-navigation .secondary-navigation a {
            padding: 1.3rem 2.4rem;
          }

          .copyright {
            display: none;
          }
      }

      @media (min-width: 768px) and (max-width: 1024px) {
        /* These prevent the navigation from overflowing horizontally */

        .primary-anchor {
          font-size: 1.8rem;
        }

        .primary-navigation a {
          padding: 2.4rem 1.5rem;
        }
      }
    </style>
  `;
}

class Navigation {
  constructor(element) {
    Object.assign(this, element.dataset);

    this.element = element;
    this._mount();
    this._attachListeners();
  }

  static getTemplate(data, logoImage) {
    return template(data, logoImage);
  }

  static getStyles(self) {
    return styles(self);
  }

  _attachListeners() {
    const primaryNavs = this.shadow.querySelectorAll('.primary-navigation a');

    for (const nav of primaryNavs) {
      nav.addEventListener('click', e => {
        const activePrimaryNav = this.shadow.
          querySelector('.navigation-item.active');
        const subNav = e.target.parentElement;

        if (activePrimaryNav) {
          activePrimaryNav.classList.remove('active');
        }

        if (subNav.querySelector('.secondary-navigation')) {
          subNav.classList.toggle('active');

          document.body.classList.add('nav-active');
        }
      });
    }
  }

  _render() {
    this.shadow.innerHTML = Navigation.getStyles() +
      Navigation.getTemplate(app.store.getValue('nav'), this.logoImage);
  }

  _mount() {
    this.shadow = this.element.shadowRoot || this.element.createShadowRoot();

    this._render();
  }
}

module.exports = Navigation;
