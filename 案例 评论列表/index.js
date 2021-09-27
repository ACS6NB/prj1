//获取列表函数
function getList() {
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://www.liulongbin.top:3006/api/cmtlist',
    //     success: function(res) {
    //         console.log(res);
    //     }
    // })\
    $('#username').val('')
    $('#content').val('')
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        success: function(res) {
            console.log(res);
            if (res.status !== 200) return alert('获取列表失败')
            let rows = [];
            $.each(res.data, function(i, iteam) {
                let str = ' <li class="list-group-item"> ' + iteam.content + '<span class="badge"style="background-color:blue;">评论时间:' + iteam.time + '</span> <span class="badge"style="background-color:orange;">评论人:' + iteam.username + ' </span> </li>'
                rows.push(str)
            })

            $('.list-group').empty().append(rows.join(''));
        }
    })
}

getList();
$(function() {
    // $('#add').sumbit(function(e) {
    //     e.preventDefault();
    //     let data = e.serialize();
    //     console.log(data);
    // })

    $('#add').on('submit', function(e) {
        e.preventDefault();
        let user = $('#username').val().trim();
        let content = $('#content').val().trim();
        if (user.length <= 0 || content === '') return alert('请输入完整的评论信息')
        let data = $(this).serialize();
        console.log(data);
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res.status !== 201) return alert('发表评论失败')
            getList();
            $('#add')[0].reset();
        })

    })



})