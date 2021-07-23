/*
 * @Author: pipihua
 * @Date: 2021-07-21 17:25:16
 * @LastEditTime: 2021-07-23 15:33:20
 * @LastEditors: pipihua
 * @Description: nodejs通信
 * @FilePath: /socket-app/react-socket/src/apis/node-chat.js
 * 佛祖保佑永无BUG
 */

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000/')

const connect = cb => {
  // 监听连接
  socket.on('connect', () => {
    if (socket.connected) {
      cb({ data: 'You entered' })
    }
  })

  // 看到自己发送的数据
  socket.on('message', msg => {
    cb(msg)
  })

  // 除了自己发送的数据，可以看到其他人的广播数据
  socket.on('broadcast', msg => {
    cb(msg)
  })
}
const sendMsg = (msg = '') => {
  socket.send(socket.id, msg)
}

export { connect, sendMsg }
