/*
 * @Author: pipihua
 * @Date: 2021-07-22 16:44:28
 * @LastEditTime: 2021-07-22 16:48:14
 * @LastEditors: pipihua
 * @Description: Nodejs通信
 * @FilePath: /socket-app/node-socket/main.js
 * 佛祖保佑永无BUG
 */

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// This enables CORs and ensures that our frontend,
// running on a different server can connect to our backend
io.set('origins', '*:*')
// whenever we receive a `connection` event
// our async function is then called
io.on('connection', async socket => {
  // we should see this printed out whenever we have
  // a successful connection
  console.log('Client Successfully Connected')

  // we then send out a new message to the
  // `chat` channel with "Hello World"
  // Our clientside should be able to see
  // this and print it out in the console
  io.emit('chat', 'hello world')
})

server.listen(5000, () => {
  console.log('Backend Server is running on http://localhost:5000')
})
