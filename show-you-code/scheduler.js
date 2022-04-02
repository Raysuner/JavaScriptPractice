class Scheduler {
  constructor(limit) {
    this.tasks = [];
    this.limit = limit;
    this.count = 0;
  }

  addTask(task, delay) {
    const promiseTask = new Promise((resolve) => {
      setTimeout(() => {
        console.log(task);
        resolve(task);
      }, delay);
    });
    this.tasks.push(promiseTask);
    return this;
  }

  start() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  end() {
    this.tasks = [];
  }

  request() {
    if (this.count === this.limit || !this.tasks.length) return;
    console.log("tasks", this.tasks);
    this.count++;
    const promiseTask = this.tasks.shift();
    promiseTask.then(() => {
      this.count--;
      this.request();
    });
  }
}

const scheduler = new Scheduler(2);

for (let i = 0; i < 10; i++) {
  scheduler.addTask(`${i}`, 1000);
}

scheduler.start();
