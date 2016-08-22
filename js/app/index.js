(() => {
  function fetchData() {
    const navData = app.store.getJson('/data/data.json');

    navData.then(data => app.store.setValue('data', data));
  }

  function attachGlobalListeners() {
    window.addEventListener('evergreen::updateviews',
      () => app.view.mountComponents());
  }

  function init() {
    const Router = require('/evergreenjs/js/core/router.js');
    const Store = require('/evergreenjs/js/core/store.js');
    const View = require('/evergreenjs/js/core/view.js');

    app.store = new Store();
    app.router = new Router(app.ROUTES);
    app.view = View;

    fetchData();

    app.view.mountComponents();

    attachGlobalListeners();
  }

  window.addEventListener('evergreen::dependenciesready', init);
})();
