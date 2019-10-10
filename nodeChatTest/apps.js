/* 모듈 불러오기 */
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

/* express 객체 생성 */
const app = express();

/* express http 서버 생성 */
const server = http.createServer(app);

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server);

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('에러');
    } else {
      response.writeHead(200, {'Content-Type':'text/html'});
      response.write(data);
      response.end();
    }
  });
});

/* 서버를 3000 포트로 listen */
server.listen(3000, function() {
  console.log('서버 실행 중..');
})