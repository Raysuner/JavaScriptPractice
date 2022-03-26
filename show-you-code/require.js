function readFile(url, callBack) {
  //ajax请求 读取 目标url模块内容
  let xhr = new XMLHttpRequest();
  xhr.open("get", url); //异步 浏览器端不能使同步请求
  xhr.onload = function () {
    callBack(xhr.responseText);
  };
  xhr.send();
  // console.log(1)
}

function require(name) {
  //name =url

  if (name in require.cache) {
    //看模块是否被加载 ，如果是直接从缓存返回
    return require.cache[name].exports;
  }

  let code = require.codeCache[name];
  let codder = new Function("module,exports", code); //构造一个运行模块代码的函数

  let module = {
    id: name,
    exports: {},
  };
  require.cache[name] = module; // 创建的module对象 就是模块的返回对象 将模块的返回对象 添加到缓存对象 为什么这一步要放在codder函数调用前面  因为如果放在后面 函数调用先运行 在返回之前 会发生 循环调用会爆栈(循环依赖) 所以放在前面 结合之前的if判断条件
  codder(module, module.exports, require); //改变 导入的模块的 exports的值
  // console.log(require.cache)
  // console.log("test",module.exports)
  return module.exports;
}

require.cache = {}; //模块的缓存,模块名字映射到模块对象

require.codeCache = {}; //模块名称映射到模块代码的缓存对象,也就是缓存模块的源代码

require.use = function (entry) {
  //给定入口文件 加载所有依赖 并执行
  loadAllDeps(entry, () => {
    require(entry);
  });
};

//moduleName 是模块的文件名称
//加载模块及模块依赖的所有模块,并缓存
function loadAllDeps(moduleName, callBack) {
  //异步函数完成后调用callback
  //处理可能存在的循环依赖
  if (require.codeCache[moduleName]) {
    callBack();
    return;
  }
  readFile(moduleName, (code) => {
    require.codeCache[moduleName] = code; //缓存模块名字对应的代码

    let deps = getDeps(code);
    if (deps.length > 0) {
      let count = 0; //用来计数 判断 递归调用的次数
      for (let dep of deps) {
        //加载每一个依赖和其所有的依赖
        //这里利用递归调用 传入每次的依赖模块的名字 同时传入一个函数给callback
        //用来判断递归什么时候结束 当前模块所有的依赖都load 之后
        loadAllDeps(dep, () => {
          count++; //每次递归调用都加一次
          console.log('test', dep)
          if (count == deps.length) {
            //递归结束 调用callback函数
            callBack();
          }
        });
      }
    } else {
      //当前模块没有依赖
      callBack();
    }
  });
}

function getDeps(code) {
  //由模块源代码 得到模块内部依赖的文件名
  let re = /require\s*\(\s*["']([^"']+)["']\s*\)/g;
  let deps = [];
  let match = null;

  while ((match = re.exec(code))) {
    deps.push(match[1]);
  }
  return deps;
}

window.require = require;