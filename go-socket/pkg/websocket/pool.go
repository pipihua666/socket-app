/*
 * @Author: pipihua
 * @Date: 2021-07-22 15:01:18
 * @LastEditTime: 2021-07-22 17:45:33
 * @LastEditors: pipihua
 * @Description: 连接池
 * @FilePath: /socket-app/go-socket/pkg/websocket/pool.go
 * 佛祖保佑永无BUG
 */

package websocket

import "fmt"

type Pool struct {
	Register   chan *Client     // 有新的连接注册用户，通知连接池
	UnRegister chan *Client     // 注销用户，通知连接池
	Clients    map[*Client]bool // 通过布尔值判断客户端是否活动
	Broadcast  chan Message     // 一个通道，当它传递消息时，将循环遍历池中的所有客户端并通过套接字连接发送消息。
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		UnRegister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
		case client := <-pool.UnRegister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
