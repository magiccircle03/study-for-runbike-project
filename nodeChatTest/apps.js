/* 모듈 불러오기 */
const express = require('express');
const socket = require('socket.io');
const http = require('http');

/* express 객체 생성 */
const app = express();

/* express http 서버 생성 */
const server = http.createServer(app);

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server);

/* Get 방식으로 접속하면 실행 */
app.get('/', function(request, response) {
    console.log('유저가 / 으로 접속하였습니다!');
    response.send('Hello, Express Server!!');
})

/* 서버를 3000 포트로 listen */
server.listen(3000, function() {
  console.log('서버 실행 중..');
})