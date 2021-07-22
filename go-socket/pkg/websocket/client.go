/*
 * @Author: pipihua
 * @Date: 2021-07-22 15:00:40
 * @LastEditTime: 2021-07-22 18:22:59
 * @LastEditors: pipihua
 * @Description:
 * @FilePath: /socket-app/go-socket/pkg/websocket/client.go
 * 佛祖保佑永无BUG
 */
package websocket

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string          // 特定连接的唯一可识别字符串
	Conn *websocket.Conn // 指向websocket.Conn对象的指针
	Pool *Pool           // 指向该客户端在连接池中的指针
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.UnRegister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println("123" + err.Error())
			return
		}
		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
	}
}
