export type Operation = 'multiply' | 'add' | 'divide';
type Result = number | string;

export const calculator = (
  number1: number,
  number2: number,
  operation: Operation
): Result => {
  switch (operation) {
    case 'multiply':
      return number1 * number2;
    case 'add':
      return number1 + number2;
    case 'divide':
      if (number2 === 0) {
        throw new Error('You cannot divide by 0!');
      }
      return number1 / number2;
    default:
      throw new Error('Operation is not really that valid');
  }
};
try {
  console.log(
    calculator(
      Number(process.argv[2]),
      Number(process.argv[3]),
      process.argv[4] as Operation
    )
  );
} catch (e: unknown) {
  console.log(
    e instanceof Error ? `Error: ${e.message}` : 'Something went really wrong!'
  );
}
