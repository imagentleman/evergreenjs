class Store {
  constructor() {
    this.state = {};

    this.oneWayBinder = {
      set: function(obj, prop, value) {
        const watcher = new CustomEvent('evergreen::updateviews');

        // the original intented assignment is performed
        obj[prop] = value;

        window.dispatchEvent(watcher);

        return true;
      }
    };

    this.proxy = new Proxy(this.state, this.oneWayBinder);
  }

  getJson(url) {
    return fetch(url).
      then(response => response.json()).
      then(json => json);
  }

  setValue(key, value) {
    this.proxy[key] = value;
  }

  getValue(key) {
    return this.state[key];
  }

}

module.exports = Store;
