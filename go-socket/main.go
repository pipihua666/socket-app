package main

import (
	"fmt"
	"net/http"

	"github.com/pipihua666/socket-app/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) error {
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintln(w, err)
		return err
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
	return nil
}

func setupRoutes() {
	// 初始化连接池
	pool := websocket.NewPool()
	// 无线循环读取信道的值
	go pool.Start()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App :8080")
	setupRoutes()
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
