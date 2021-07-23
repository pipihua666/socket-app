/*
 * @Author: pipihua
 * @Date: 2021-07-22 16:44:28
 * @LastEditTime: 2021-07-23 15:38:25
 * @LastEditors: pipihua
 * @Description: Nodejs通信
 * @FilePath: /socket-app/node-socket/index.js
 * 佛祖保佑永无BUG
 */

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

io.on('connection', async socket => {
  // 有新的成员加入
  socket.broadcast.emit('broadcast', {
    data: `New member ${socket.id} joins`
  })

  socket.on('message', (id, msg) => {
    // 广播给除了自己的其他人
    socket.broadcast.emit('broadcast', { data: JSON.stringify({ id, msg }) })
    // 自己发送的消息返回给自己
    socket.send({ data: JSON.stringify({ id, msg }) })
  })

  // 有人退出
  socket.on('disconnect', reason => {
    socket.broadcast.emit('broadcast', {
      data: `${socket.id} quit because of ${reason}`
    })
  })
})

server.listen(5000, () => {
  console.log('Backend Server is running on http://localhost:5000')
})
