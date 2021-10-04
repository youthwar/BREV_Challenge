
type Task =  { 
  readonly operation: 'add' | 'subtract';
  readonly arg1: number;
  readonly arg2: number;
};

const process = (tasks: ReadonlyArray<Task>) => {
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
  
  console.log(add, addInput);

};

export default process;
