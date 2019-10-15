var socket_chat = io('/chat');

  //msg에서 키를 누를떄
    $("#input_msg").keydown(function(key){
      //해당하는 키가 엔터키(13) 일떄
      if(key.keyCode == 13){
          //msg_process를 클릭해준다.
          msg_process.click();
      }
  });

/* 접속 되었을 때 실행 */
socket_chat.on('connect', function() {
  /* 이름을 입력받고 */
  var name = prompt('반갑습니다!', '');

  /* 방번호 입력받고 */
  var room_num = prompt('접속할 방 번호 입력', '');

  /* 이름이 빈칸인 경우 */
  if(!name) {
    name = '익명의 참새';
  }

  /* 방번호 빈칸인 경우 */
  if(!room_num) {
    room_num = 0;
  }

  /* join */
  socket_chat.emit('join', {'name':name,'room_num':room_num});
});

/* 서버로부터 데이터 받은 경우 */
socket_chat.on('update', function(data) {
  
  var node;
  
  if(data.name=="SERVER"){
    node = data.message;
  }else{
    node = data.name+": "+data.message;
  }

  var divClassName = '';
  var spanClassName='';

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch(data.type) {
    case 'message':
       divClassName = 'balloon_other';
      spanClassName = 'ballon_span';
      break;

    case 'join':
      divClassName = 'join';
      break;

    case 'disconnect':
      divClassName = 'disconnect';
      break;
  }

  $('#chat').append('<div class="'+divClassName+'"><span class="'+spanClassName+'">'+node+'</span></div>');
  
});


/* 메시지 전송 함수 */
function send() {
	// 입력되어있는 데이터 가져오기
	var message = $('#input_msg').val();
	
	if(message.length>0){
		// 가져왔으니 데이터 빈칸으로 변경
    $('#input_msg').val('');
    
		// 내가 전송할 메시지 클라이언트에게 표시
		$('#chat').append('<div class="balloon_me"><span class="ballon_span">'+message+'</span></div>');
			
		// 서버로 message 이벤트 전달 + 데이터와 함께
		socket_chat.emit('message', {type: 'message', message: message});
	}
}

