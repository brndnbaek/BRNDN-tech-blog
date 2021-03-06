const { Liquid } = require('liquidjs');

const liquidOptions = {
  extname: '.liquid',
  strict_filters: true,
  root: ['_includes'],
};

const liquidEngine = new Liquid(liquidOptions);

const ErrorOverlay = require('eleventy-plugin-error-overlay');
const fs = require('fs');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (config) {
  config.setLibrary('liquid', liquidEngine);
  
  // markdown syntax highlight
  config.addPlugin(syntaxHighlight);

  // Layout aliases
  config.addLayoutAlias('default', 'layouts/base.liquid');
  config.addLayoutAlias('single', 'layouts/single.liquid');

  // Static assets to pass through
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/robots.txt');

  // 11ty error overlay
  // https://github.com/stevenpetryk/eleventy-plugin-error-overlay
  config.addPlugin(ErrorOverlay);

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'src/_output',
    },
    passthroughFileCopy: true,
    templateFormats: ['md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
