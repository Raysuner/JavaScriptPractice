class TaskQueue {
  constructor() {
    this.tasks = [];
    this.taskRunning = false;
  }

  createNext() {
    var called = false;
    return () => {
      if (called) return;
      called = true;

      if (this.tasks.length) {
        var task = this.tasks.shift();
        task(this.createNext());
      } else {
        this.taskRunning = false;
      }
    };
  }

  addTask(taskFunc) {
    if (this.taskRunning) {
      this.tasks.push(taskFunc);
    } else {
      this.taskRunning = true;
      taskFunc(this.createNext());
    }
    return this;
  }
}
