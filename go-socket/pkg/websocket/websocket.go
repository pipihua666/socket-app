/*
 * @Author: pipihua
 * @Date: 2021-07-22 14:50:00
 * @LastEditTime: 2021-07-22 15:02:01
 * @LastEditors: pipihua
 * @Description: 处理多个客户端
 * @FilePath: /socket-app/go-socket/pkg/websocket/websocket.go
 * 佛祖保佑永无BUG
 */
package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return conn, nil
}
