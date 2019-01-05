const Queue = class Queue {

  constructor() {
    this.stack1 = [];
    this.stack2 = [];
    this.count = 0;
  }

  enqueue(item) {
    this.stack1.push(item);
    this.count++;
  }

  dequeue() {
    if (this.stack2.length > 0) {
      this.count--;
      return this.stack2.pop();
    }

    if (this.stack1.length === 0) {
      return null;
    }

    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }

    this.count--;
    return this.stack2.pop();
  }
  remove(condition) {
    if (removeItemFromArr(this.stack1, condition) === true) {
      this.count--;
    } else if (removeItemFromArr(this.stack2, condition) === true) {
      this.count--;
    }
  }

  returnAllItemsInOrder() {
    let queue = [];
    let index = 0;
    for (let i = this.stack2.length - 1; i >= 0; i--) {
      queue[index++] = this.stack2[i];
    }

    for (let i = 0; i < this.stack1.length; i++) {
      queue[index++] = this.stack1[i];
    }

    return queue;
  }
}

function removeItemFromArr(arr, condition) {
  let indexOf = -1;
  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i]) === true) {
      indexOf = i;
      break;
    }
  }

  if (indexOf !== -1) {
    arr.splice(indexOf, 1);
    return true;
  }

  return false;
}

module.exports = Queue;