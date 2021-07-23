// App.js
import { useEffect, useState } from 'react'
import Header from './components/Header'
import ChatHistory from './components/ChatHistory'
import InputHandler from './components/InputHandler'
import {
  connect as connectGolang,
  sendMsg as sendMsgToGolang
} from './apis/go-chat'
import {
  connect as connectNode,
  sendMsg as sendMsgToNode
} from './apis/node-chat'

const App = () => {
  const [goHistory, setGoHistory] = useState([])
  const [nodeHistory, setNodeHistory] = useState([])

  useEffect(() => {
    connectGolang(message => {
      setGoHistory(prevHistory =>
        message ? [...prevHistory, message] : prevHistory
      )
    })
    connectNode(msg => {
      console.log('connectNode', msg)
      setNodeHistory(prevHistory => (msg ? [...prevHistory, msg] : prevHistory))
    })
  }, [])

  const sendForGo = (message = '') => {
    sendMsgToGolang(message)
  }

  const sendForNode = (message = '') => {
    sendMsgToNode(message)
  }

  return (
    <div>
      <Header />
      <div className="flex justify-around h-screen flex-wrap">
        <div className="shadow-xl flex-1 mx-2">
          <h1 className="text-lg subpixel-antialiased m-3">Golang WebSocket</h1>
          <ChatHistory history={goHistory} />
          <InputHandler send={sendForGo} />
        </div>
        <div className="shadow-xl flex-1 mx-2">
          <h1 className="text-lg subpixel-antialiased m-3">Nodejs Websocket</h1>
          <ChatHistory history={nodeHistory} />
          <InputHandler send={sendForNode} />
        </div>
      </div>
    </div>
  )
}

export default App
