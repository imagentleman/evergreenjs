var app = {};

app.DEPENDENCIES = [
  '/evergreenjs/js/core/router.js',
  '/evergreenjs/js/core/store.js',
  '/evergreenjs/js/core/view.js',
  '/evergreenjs/js/app/components/headline.js',
  '/evergreenjs/js/app/components/content.js'
];

app.ROUTES = {
  '': '/evergreenjs/pages/main.html',
  '*': '/evergreenjs/pages/another-page.html'
};

app.COMPONENTS = [
  {
    tag: 'evergreen-headline',
    module: '/evergreenjs/js/app/components/headline.js'
  },
  {
    tag: 'evergreen-content',
    module: '/evergreenjs/js/app/components/content.js'
  }
];
