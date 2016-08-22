var app = {};

app.DEPENDENCIES = [
  '/js/core/router.js',
  '/js/core/store.js',
  '/js/core/view.js',
  '/js/app/components/headline.js',
  '/js/app/components/content.js'
];

app.ROUTES = {
  '': '/pages/main.html',
  '*': '/pages/another-page.html'
};

app.COMPONENTS = [
  {
    tag: 'evergreen-headline',
    module: '/js/app/components/headline.js'
  },
  {
    tag: 'evergreen-content',
    module: '/js/app/components/content.js'
  }
];
