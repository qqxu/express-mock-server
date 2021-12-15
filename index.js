const express = require('express');

// 实例化express
const app = express();

// mock api
const apis = require('./api');

/**
 * @description: 格式化
 *  格式化前：
 * { 
 * 'POST' '/api/xxx': (req, res) => {},
 * 'GET' '/api/xxx1': (req, res) => {}
 * }
 * 格式化后：
 * [{ 
 *  method: 'POST',
 *  path: '/api/xxx',
 *  callback: (req, res) => {},
 * },
 * { 
 *  method: 'GET',
 *  path: '/api/xxx1',
 *  callback: (req, res) => {},
 * }]
 * }
 */
const apiList = Object.entries(apis).map(([key, value]) => { 
  const keyList = key.split(' ');
  return { 
    method: keyList[0],
    path: keyList[1],
    callback: value,
  }
 });
 
/**
 * @description: 监听path请求，执行对应回调
 * https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Introduction
 * app.get('/xxx', () => {req, res}) 路由监听到关于目标路径 '/xxx'的Http get 请求时 调用回调函数
 */ 
apiList.forEach(itm => {
  const expressMethod = itm.method.toLocaleLowerCase();
  app[expressMethod](itm.path, itm.callback);
})

// 启动服务器
const server = app.listen(3000, 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Server running at http://${address}:${port}`);
})

