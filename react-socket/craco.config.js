/*
 * @Author: pipihua
 * @Date: 2021-07-22 11:20:20
 * @LastEditTime: 2021-07-22 11:20:28
 * @LastEditors: pipihua
 * @Description:
 * @FilePath: /react-socket/craco.config.js
 * 佛祖保佑永无BUG
 */
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  }
}
