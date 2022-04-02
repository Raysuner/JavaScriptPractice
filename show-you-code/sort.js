function swap(array, pos1, pos2) {
  const temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
}

function bubbleSort1(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
}

function bubbleSort2(array) {
  let sorted = false;
  for (let i = array.length - 1; i >= 0; i--) {
    sorted = true;
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        sorted = false;
        swap(array, j, j + 1);
      }
    }
    if (sorted) {
      break;
    }
  }
}

function bubbleSort3(array) {
  let end = null;
  for (let i = array.length - 1; i >= 0; ) {
    end = -1;
    for (let j = 0; j < i; j++) {
      if (array[j + 1] < array[j]) {
        end = j;
        swap(array, j + 1, j);
      }
    }
    i = end;
  }
}

function selectSort(array) {
  let minIdx = null;
  for (let i = 0; i < array.length; i++) {
    minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    swap(array, i, minIdx);
  }
}

function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    const temp = array[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      if (array[j] <= temp) {
        break;
      }
      array[j + 1] = array[j];
    }
    array[j + 1] = temp; // 这里j + 1的原因最后一次比较array[j]>=temp，所以最后一次整体向右移动是从j+1开始的，那么j+1的位置是空的
  }
}

const arr = [1, 4, 2, 7, 3, 8, 5, 9, 6];
// bubbleSort3(arr)
// selectSort(arr)
// insertSort(arr);
console.log(arr);
