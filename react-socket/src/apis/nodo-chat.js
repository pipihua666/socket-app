/*
 * @Author: pipihua
 * @Date: 2021-07-21 17:25:16
 * @LastEditTime: 2021-07-21 17:25:38
 * @LastEditors: pipihua
 * @Description: nodejs通信
 * @FilePath: /my-socket-app/src/apis/nodejs.js
 * 佛祖保佑永无BUG
 */

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000/')

function connect(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  socket.on('chat', message => {
    // console.log the message for posterity
    console.log(message)
    // trigger the callback passed in when
    // our App component calls connect
    cb(message)
  })
}

export { connect }
