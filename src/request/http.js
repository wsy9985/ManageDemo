async function http(obj) {
    let { method, url, params, data } = obj;

    // params需要处理--> 转换成key=value&key=value
    // 1、如果有params参数,则把params对象转换成 key=value&key=value的形式,并且要拼接到url之后
    // 2、如果没有params参数,则不管
    if(params){
        // 此时需要将对象,转换成key=value&key=value
        // 固定写法: new URLSearchParam(obj).toString()
        let str = new URLSearchParams(params).toString();
        // 拼接到url上
        url += '?' + str;
    }

    let res 
    // data需要处理
    // 1、如果有data, 此时需要写完整的代码headers...
    // 2、如果没有data, 则不需要设置headers,直接发送即可
    if(data){
        res = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
    }else{
        res = await fetch(url)
    }

    // 将获取的结果经过处理之后返回
    return res.json()
}

export default http;