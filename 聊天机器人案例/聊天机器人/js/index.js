$(function() {
        $(function() {
            // 初始化右侧滚动条
            // 这个方法定义在scroll.js中
            resetui()
        })
        $('#inpSend').on('click', function() {
                let inpVal = $('#inpVal').val().trim(); //获取聊天框输入的内容
                if (inpVal.length <= 0) return alert('请输入内容');
                //将输入框的内容添加到聊天框里面去
                $('.talk_list').append('<li class="right_word"> <img src="img/person02.png" /> <span>' + inpVal + '</span></li>')
                    //重置滚动条
                resetui();
                //清空输入框内容
                $('#inpVal').val('');
                //把用户输入的内容传到接受函数里面
                getMsg(inpVal);
            })
            //接受机器人消息、
        function getMsg(text) {
            $.ajax({
                type: 'GET',
                url: 'http://www.liulongbin.top:3006/api/robot',
                data: {
                    spoken: text //传一个用户的聊天消息
                },
                success: function(res) {
                    console.log(res.message);
                    let msg = res.data.info.text;
                    console.log(msg);
                    if (res.message === 'success') {
                        $('.talk_list').append('<li class="left_word"><img src="img/1.jpeg" /> <span>' + msg + '</span></li>')
                    } //添加到聊天框 把传回的消息
                    resetui();
                    //调用 声音函数
                    getVoice(msg);
                }

            })








        }
        //将接收回来的文字转换为yuyin
        function getVoice(text) {
            $.ajax({
                type: 'get',
                url: 'http://www.liulongbin.top:3006/api/synthesize',
                data: {
                    text: text //将机器人返回的消息传递过去
                },
                success: function(res) {
                    console.log(res);
                    if (res.message === 'success') {
                        $('#audio').attr('src', res.voiceUrl) // 将audio的地址转换为音频地址
                    }

                }
            })

        }

        let inpVal = document.querySelector('#inpVal');
        inpVal.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                $('#inpSend').click();
            }
        })



    })
    //http://www.liulongbin.top:3006/api/robat 聊天接口
    //http://www.liulongbin.top:3006/api/synthesize 转语音接口