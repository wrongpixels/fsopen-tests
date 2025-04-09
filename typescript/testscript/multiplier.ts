interface Multipliable {
  value1: number;
  value2: number;
}

const multiplier = (values: Multipliable): number =>
  values.value1 * values.value2;

const getArguments = (): Multipliable => {
  const args: string[] = process.argv;
  if (args.length < 4 || args.length > 4) {
    throw new Error(
      args.length > 4 ? 'Too many arguments' : 'Not enough arguments'
    );
  }

  const values: Multipliable = {
    value1: Number(args[2]),
    value2: Number(args[3]),
  };
  if (isNaN(values.value1) || isNaN(values.value2)) {
    throw new Error('Both parameters must be numbers');
  }
  return values;
};

try {
  console.log(multiplier(getArguments()));
} catch (e) {
  console.log(
    e instanceof Error ? `Error: ${e.message}` : 'Something went so wrong'
  );
}
