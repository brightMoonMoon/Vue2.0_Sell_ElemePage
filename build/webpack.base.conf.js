var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
  //定义一个根目录 
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  //入口文件 
  output: {
    path: config.build.assetsRoot,
    //在config文件下index.js文件中 build对象的assetsRoot属性、
    //  
    filename: '[name].js',
    //app.js 
    // 对应输出的文件名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
      // 请求静态资源的局对路径，这个是对应index 中的assetsPublicPath属性
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 自动补全文件的后缀名称
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      //提供别名，缩写我们搜索字符串的长度
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 对于小于10kb的文件，就会生成一个base64的字符串  生成规则如下
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
