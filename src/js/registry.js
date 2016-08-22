function require(path) {
  return require.cache[path];
}

require.cache = {};

(() => {
  function install(path, source) {
    let module = {};

    const closure = `(()=>{${source}})();`;

    const fn = new Function('require', 'module', closure);

    fn(require, module);

    return {
      path,
      exports: module.exports
    };
  }

  Promise.all(app.DEPENDENCIES.map(path =>
    fetch(path).
      then(response => response.text()).
      then(text => install(path, text))
  )).then(dependencies => {
    dependencies.forEach(dependency =>
      require.cache[dependency.path] = dependency.exports
    );

    const dependenciesReadyEvent =
      new CustomEvent('evergreen::dependenciesready');

    window.dispatchEvent(dependenciesReadyEvent);
  });
})();
