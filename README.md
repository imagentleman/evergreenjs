# EvergreenJS

Just a front end framework (usando lo último en guarachas)

## Disclaimer

This front end framework is using some APIs that probably won't work anywhere except Chrome (i.e. customEvents, proxies, shadow DOM v0, etc. They are all available by default and don't require enabling any browser flags).

## Troubleshooting

* Only tested on the latest version of node (v6.3.1), Chrome (v52) and Opera (v41) on Win10 and El Capitan, so you might require those if something doesn't work.
* The server listens to port 8080 by default, so it needs to be free before running "npm start".

## Demo

https://imagentleman.github.io/evergreenjs/

## Highlights

* Uses no dependencies whatsoever.
* Has a built-in a basic server (with mime types and error handling) to serve the files.
* Has a hash based router.
* Has a CommonJS module loader.
* Has a custom view engine using ES2015 classes, template literals and shadow dom (that helps create independent components with encapsulated code).
* Has a basic build system with npm scripts (run server, clean/delete, copy and watch).
* Has a watcher that runs the build again every time a file in the src folder is modified.
* Used ES2015 features (classes, arrow functions, fetch, template literals, etc).
* Has an .editorconfig file (for consistent editor behavior).
* Has a .gitattributes file (to normalize newline endings, specially for people working on windows machines).
* Has an eslint configuration with some sane defaults.
* Uses css custom properties (to mimic preprocessor variables).

## Overview

TODO: Add overview of file structure and how to write a component
