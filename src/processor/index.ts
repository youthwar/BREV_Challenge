import axios from 'axios';
const addEndpoint = 'https://dh4ssdyanf.execute-api.us-west-2.amazonaws.com/Prod/batch-add?auth=brgAuth';
const subtractEndpoint = 'https://dh4ssdyanf.execute-api.us-west-2.amazonaws.com/Prod/batch-subtract?auth=brgAuth';

type Task =  { 
  readonly operation: 'add' | 'subtract';
  readonly arg1: number;
  readonly arg2: number;
};

type Results = { data: { output: number[]} };
type mappedVal = { arg1: number; arg2: number; currIdx: number };

const process = async (tasks: ReadonlyArray<Task>) => {
  const { add, subtract } = tasks.reduce((acc: any, curr: Task, currIdx: number) => {
    const {arg1, arg2, operation } = curr;
    acc[operation]
      ? acc[operation] = [...acc[operation], { arg1, arg2, currIdx }] 
      : acc[operation] = [{ arg1, arg2, currIdx }]
    return acc;
  }, {});

  // map these values to the input that the api wants
  const addInput = add.map(({ arg1, arg2 }: { arg1: number; arg2: number; }) => ({ arg1, arg2 }));
  const subInput = subtract.map(({ arg1, arg2 }: { arg1: number; arg2: number; }) => ({ arg1, arg2 }));
  
  const { data: addResults }: Results  = await axios.post(addEndpoint, {
    input: addInput
  });

  const { data: subtractResults }: Results = await axios.post(subtractEndpoint, {
    input: subInput
  });

  const { output: addOutput } = addResults;
  const { output: subtractOutput } = subtractResults;

  const returnArr = new Array(tasks.length);

  add.forEach(({ currIdx }: mappedVal, i: number) => {
    returnArr[currIdx] = addOutput[i];
  });

  subtract.forEach(({ currIdx }: mappedVal, i: number) => {
    returnArr[currIdx] = subtractOutput[i];
  });

  return returnArr;

};

export default process;
