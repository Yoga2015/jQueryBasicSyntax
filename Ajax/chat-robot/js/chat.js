$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();   // 重置滚动条的位置

  // 1、为 发生按钮 绑定 点击事件 
  $('#btnSend').on('click', function () {
    // 2、获取用户 在文本输入框中 输入的内容
    let chatText = $('#ipt').val().trim();
    // 3、判断用户输入的内容是否为空
    if (chatText <= 0) {
      // console.log('没有输入内容');
      // 当用户在输入框输入内容后，点击发送后，输入框的内容需要清空
      return $('#ipt').val('');
    }
    // 4、如果用户输入了内容，就把内容追加到 聊天内容区域 中
    $('#talk_list').append(` <li class="right_word">
            <img src="img/person02.png" /> <span>`+ chatText + `</span>
          </li>`);
    // 当用户在输入框输入内容后，点击发送后，输入框的内容需要清空
    $('#ipt').val('');

    // resetui 函数 用于重置滚动条的位置   来自scroll.js
    resetui();

    //当用户有输入聊天内容，且点击发送按钮后， 发起请求，获取聊天内容 ！！
    getMsg(chatText);

  });

  // 获取聊天机器人发送回来的信息
  function getMsg(text) {
    $.ajax({
      method: 'Get',    // 请求的方式
      url: 'http://www.liulongbin.top:3006/api/robot', // 请求的 URL 地址
      data: {
        spoken: text,     //  get请求要携带的数据
      },
      success: function (res) {  //success函数 是 请求成功之后的要执行的回调函数
        console.log(res);    // 如何拿到服务器响应回来的具体信息呢？看 res
        // 如果请求成功
        if (res.message === 'success') {
          // 接收 服务器响应回来的聊天信息
          let serverMsg = res.data.info.text;
          // 把服务器响应回来的聊天信息 追加到 聊天内容区域 中
          $('#talk_list').append(` <li class="left_word">
            <img src="img/person01.png" /> <span>`+ serverMsg + `</span>
          </li>`)
          // resetui 函数 用于重置滚动条的位置   来自scroll.js
          resetui();

          // 把 服务器响应回来的数据 从文字 转化为 语音  ！！
          getVoice(serverMsg);
        }
      }
    });
  };

  // 把 文字 转化为 语音 进行播放
  function getVoice(voiceText) {
    $.ajax({
      method: 'Get',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: voiceText
      },
      success: function (res) {
        console.log(res);
        if (res.status === 200) {
          // 播放语音  动态赋值
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    });
  };

  // 为文本输入框绑定 keyup 事件 ，让文本输入框 响应回车事件后，提交消息
  $('#ipt').on('keyup', function (e) {
    console.log("用户弹起了回车键");
    // e.keyCode 可以获取到当前 按键的编码
    // console.log(e.keyCode); //回车键 是  13

    if (e.keyCode === 13) {
      // 调用 发送按钮 元素的 click 函数，可以通过编程的形式触发按钮的点击事件
      $('#btnSend').click()
    }
  });

})

