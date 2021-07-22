FROM golang:1.15-alpine
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN go mod download
RUN go build -o main
CMD ["/app/main"]