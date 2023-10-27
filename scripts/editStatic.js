/**
 * There is a bug in Typedoc where the sidebar is always collapsed.
 * This edits the static/index.html file to make the sidebar expanded by default.
 */

var fs = require('fs');

function forceOpenSidebar() {
  fs.readFile('static/index.html', 'utf-8', function (err, data) {
    if (err) throw err;

    var newValue = data.replace(
      '<ul class="js-category-list category" data-id="root-src">',
      '<ul class="js-category-list category _open" data-id="root-src">',
    );

    fs.writeFile('static/index.html', newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('Finished manually editing static/index.html');
    });
  });
}
function forceCustomCss() {
  fs.copyFile('src/styles/typedoc.css', 'static/assets/monerium.css', (err) => {
    if (err) throw err;
    console.log('typedoc.css was copied to static/assets/monerium.css');
  });
  fs.readFile('static/index.html', 'utf-8', function (err, data) {
    if (err) throw err;

    var newValue = data.replace(
      '<link rel="stylesheet" href="assets/custom.css"/>',
      '<link rel="stylesheet" href="assets/custom.css"/><link rel="stylesheet" href="assets/monerium.css"/>',
    );

    fs.writeFile('static/index.html', newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('Finished manually editing static/index.html');
    });
  });
}

forceOpenSidebar();
forceCustomCss();
