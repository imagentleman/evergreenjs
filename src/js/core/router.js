class Router {
  constructor(routes) {
    this.routes = routes;

    window.addEventListener('hashchange', e => this._onRouteChange(e));

    this._loadFragment(this.routes['']);
  }

  _loadFragment() {
    const hash = location.hash.slice(1);
    let fragmentUrl = this.routes['*'];

    if (hash in this.routes) {
      fragmentUrl = this.routes[hash];
    }

    fetch(fragmentUrl).
      then(response => response.text()).
      then(html => {
        document.body.innerHTML = html;

        app.view.mountComponents();
      });
  }

  _onRouteChange() {
    this._loadFragment();
  }
}

module.exports = Router;
