// 下个任务必须等待上个任务执行完才执行，串行执行
class TaskQueue {
  constructor() {
    this.tasks = []
    this.isRunning = false
  }

  addTask(taskFunc) {
    if (this.isRunning) {
      this.tasks.push(taskFunc)
    } else {
      this.isRunning = true
      const nextFunc = () => {
        if (this.tasks.length) {
          const task = this.tasks.shift()
          task(nextFunc)
        } else {
          this.isRunning = false
        }
      }
      taskFunc(nextFunc)
    }
    return this
  }
}

const queue = new TaskQueue()
queue.addTask(function(next) {
  console.log(1)
  setTimeout(next, 3000)
}).addTask(function(next){
  console.log(2)
})