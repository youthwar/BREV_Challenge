import { operations } from './sampleData';
import process from './processor';

(async () => {
  const results = await process(operations);
  console.log({ results });
})();
