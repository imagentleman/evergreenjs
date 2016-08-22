class View {
  static mountComponents() {
    app.COMPONENTS.forEach(component => {
      const elements = document.querySelectorAll(component.tag);

      if (elements.length) {
        const componentClass = require(component.module);

        for (const el of elements) {
          new componentClass(el);
        }
      }
    });
  }
}

module.exports = View;
