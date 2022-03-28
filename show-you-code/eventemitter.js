class EventEmitter {
  constructor() {
    this._listeners = {}
  }

  on(event, listener) {
    if (event in this._listeners) {
      this._listeners[event].push(listener)
    }
    else {
      this._listeners[event] = [listener]
    }
    return this
  }

  off(event, listener) {
    if (event in this._listeners) {
      const listeners = this._listeners[event]
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1)
        }
      }
    }
  }

  emit(event, ...args) {
    if (event in this._listeners) {
      const listeners = this._listeners[event] || [] // 未定义返回空数组，避免报错
      for (const listener of listeners) {
        listener(...args)
      }
    }
  }

  once(event, listener) {
    let saveThis = this
    this.on(event, function f(...args) {
      listener(...args)
      // this.off(event, f)  这里this指向不对，所以这样不行
      console.log('this', this)
      saveThis.off(event, f)
    })
  }

  listeners(event) {
    return this._listeners[event]
  }
}

const myEmitter = new EventEmitter();
// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

myEmitter.once('event', function fouthListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
})

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);
myEmitter.emit('event', 11, 22, 3, 4, 5);

console.log(myEmitter.listeners('event'));