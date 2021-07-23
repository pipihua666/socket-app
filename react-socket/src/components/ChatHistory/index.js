/*
 * @Author: pipihua
 * @Date: 2021-07-22 11:08:45
 * @LastEditTime: 2021-07-23 15:06:37
 * @LastEditors: pipihua
 * @Description: 从服务器收到的history message
 * @FilePath: /socket-app/react-socket/src/components/ChatHistory/index.js
 * 佛祖保佑永无BUG
 */

import './style.scss'

const ChatHistory = ({ history = [] }) => {
  const messages = Array.isArray(history)
    ? history.map((msg, index) => (
        <p key={index} className="shadow border mb-3 p-3">
          {msg.data}
        </p>
      ))
    : null

  return (
    <div className="m-3">
      {<h2 className="text-gray-600 mb-1">Chat History</h2>}
      {messages}
    </div>
  )
}

export default ChatHistory
