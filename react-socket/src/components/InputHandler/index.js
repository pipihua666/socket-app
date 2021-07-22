/*
 * @Author: pipihua
 * @Date: 2021-07-22 14:43:29
 * @LastEditTime: 2021-07-22 17:41:37
 * @LastEditors: pipihua
 * @Description: 输入框
 * @FilePath: /socket-app/react-socket/src/components/InputHandler/index.js
 * 佛祖保佑永无BUG
 */

import { useState } from 'react'

const InputHandler = props => {
  const { send = () => {} } = props
  const [value, setValue] = useState('')
  return (
    <input
      className="block border border-transparent rounded-lg focus:outline-none focus:ring-2 border-gray-300 mb-3 h-9 w-10/12 pl-4 mx-auto"
      placeholder="消息回车发送"
      value={value}
      onChange={e => {
        setValue(e.target.value)
      }}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          send(value)
          setValue('')
        }
      }}
    />
  )
}

export default InputHandler
