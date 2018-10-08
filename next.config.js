const path = require("path");

// css
const withCSS = require('@zeit/next-css')

// less
const withLess = require('@zeit/next-less')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {
  }
}

module.exports = Object.assign({},
  withCSS(withLess({
    cssModules: true,
    webpack(config, {isServer}) {
      if (!isServer) {

        // css不开启css modules
        config.module.rules[2].use[2].options.modules = false;
      }

      // 添加actions和reducers快速引用
      config.resolve.alias.actions = path.resolve(__dirname, 'actions');
      config.resolve.alias.reducers = path.resolve(__dirname, 'reducers');
      return config;
    }
  }))
)

