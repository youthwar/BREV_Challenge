import axios from 'axios';
import { operations } from '../sampleData';

type Task =  { 
  operation: 'add' | 'subtract';
  arg1: number;
  arg2: number;
};

const methods: {
  add: string;
  subtract: string;
} = {
  add: 'https://dh4ssdyanf.execute-api.us-west-2.amazonaws.com/Prod/batch-add?auth=brgAuth',
  subtract: 'https://dh4ssdyanf.execute-api.us-west-2.amazonaws.com/Prod/batch-subtract?auth=brgAuth'
};

class Queue {
  completed: [] = [];

  constructor() {
    this.queue = [];
  }

  enqueue({ arg1, arg2, operation }:Task) {
    const fn = async (): Promise<number> => {
      return await axios.post(methods[operation], {
        input: [{ ...arg1, ...arg2 }]
      });
    }

    this.queue.push(fn);
    return this.queue;
  }

  dequeue() {
    if (this.queue.length > 0) return this.queue.shift();
  }

  async drain() {
    while(this.queue.length) {
      const currentTask = this.dequeue();
      const { data } = await currentTask();
      console.log({ data });
    }
  }
}

export default Queue;
