/**
 * 处理 data 参数
 * @param {*} data  需要发送到服务器的数据
 * @returns [string] 返回拼接好的查询字符串 username=lisi&age=18
 */
function resolveData(data) {
  let arr = [];
  for (let k in data) {
    let str = k + '=' + data[k];
    arr.push(str);
  }
  return arr.join('&')
}

// let obj = { username: 'lisi', age: 18 };
// let result = resolveData(obj);
// console.log(result);

let result = resolveData({ username: 'lisi', age: 18 });
console.log(result);