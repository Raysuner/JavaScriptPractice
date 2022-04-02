// 将一个回调风格的函数转换为一个promise风格的函数
function promisify(callbackStyle) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyle(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}
