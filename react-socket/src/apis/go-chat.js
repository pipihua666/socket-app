/*
 * @Author: pipihua
 * @Date: 2021-07-21 18:22:12
 * @LastEditTime: 2021-07-22 12:51:13
 * @LastEditors: pipihua
 * @Description: golang通信
 * @FilePath: /react-socket/src/apis/go-chat.js
 * 佛祖保佑永无BUG
 */

const socket = new WebSocket('ws://localhost:8080/ws')

const connect = cb => {
  console.log('connecting')

  socket.onopen = () => {
    console.log('Successfully Connected')
  }

  socket.onmessage = msg => {
    console.log(msg)
    cb(msg)
  }

  socket.onclose = event => {
    console.log('Socket Closed Connection: ', event)
  }

  socket.onerror = error => {
    console.log('Socket Error: ', error)
  }
}

const sendMsg = msg => {
  console.log('sending msg: ', msg)
  socket.send(msg)
}

export { connect, sendMsg }
