function promiseLimit(tasks, limit, iteratorFn) {
  let i = 0;
  const result = [];
  let finishCount = 0;

  return new Promise((resolve) => {
    const request = async (index) => {
      const res = await Promise.resolve().then(() => iteratorFn(tasks[index]));
      console.log("res", res);
      result[index] = res;
      finishCount++;

      if (i < tasks.length) {
        request(i++);
      } else {
        resolve(result);
      }
    };

    while (i < limit) {
      request(i++);
    }
  });
}

class PromiseLimiter {
  constructor(taskList) {
    this.taskList = taskList;
    this.count = 0;
    this.result = [];
  }

  request;
}

const newFetch = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
};

promiseLimit(
  [2000, 1000, 3000, 2500, 1200, 5000, 3500, 2300],
  2,
  newFetch
).then(console.log);
