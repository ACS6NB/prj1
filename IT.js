function resolveData(data) { //处理将对象转换为字符串的函数
    var arr = [];
    for (var k in data) {
        var str = k + '=' + data[k];
        arr.push(str)
    }
    return arr.join('&')
}

function itziji(options) {
    var xhr = new XMLHttpRequest();
    //把外界传过来的参数对象 转换为字符串格式
    var qs = resolveData(options.data);

    //判断用户的请求方式
    if (options.method.toUpperCase() === 'GET') {
        //发送 get请求
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();

    } else if (options.method.toUpperCase() === 'POST') {
        //发送 ；post请求
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs)
    }


    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            options.success(result)
        }
    }
}