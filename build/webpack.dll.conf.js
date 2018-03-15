const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['vue/dist/vue.common.js','vue-router', 'babel-polyfill','axios','element-ui','quill','echarts/lib/chart/funnel','echarts/lib/chart/line','echarts/lib/chart/pie','echarts/lib/component/legend','echarts/lib/component/tooltip']
  },
  // vendor: ['vue/dist/vue.common.js','vue-router', 'babel-polyfill','axios','element-ui','quill','echarts/lib/chart/funnel','echarts/lib/chart/line','echarts/lib/chart/pie','echarts/lib/component/legend','echarts/lib/component/tooltip']  
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll2.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: path.resolve(__dirname, '..'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};
