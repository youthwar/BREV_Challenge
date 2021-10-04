import { operations } from './sampleData';
import Queue from './queue';
const Q = new Queue();

operations.forEach((task) => {
  Q.enqueue(task);
});

console.log(Q.queue);
Q.drain();