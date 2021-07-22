// App.js
import { useEffect, useState } from 'react'

import Header from './components/Header'
import ChatHistory from './components/ChatHistory'
import InputHandler from './components/InputHandler'
import { connect, sendMsg } from './apis/go-chat'

const App = () => {
  const [chatHistory, setHistory] = useState([])

  useEffect(() => {
    connect(message => {
      setHistory(prevHistory => [...prevHistory, message])
    })
  }, [])

  const send = (message = '') => {
    sendMsg(message)
  }

  return (
    <div>
      <Header />
      <div className="flex justify-around h-screen flex-wrap">
        <div className="shadow-xl flex-1">
          <h1 className="text-lg subpixel-antialiased m-3">
            Golang is listening at localhost:8080
          </h1>
          <ChatHistory history={chatHistory} />
          <InputHandler send={send} />
        </div>
        <div className="shadow-xl flex-1">
          <h1 className="text-lg subpixel-antialiased m-3">
            Nodejs is listening at localhost:5000
          </h1>
          <ChatHistory history={chatHistory} />
          <InputHandler send={send} />
        </div>
      </div>
    </div>
  )
}

export default App
