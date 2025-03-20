export function Fizzbuzz(number: number) {
  ensureIsNumber(number);

  const isFizz = number % 3 === 0;
  const isBuzz = number % 5 === 0;

  if (isFizz && isBuzz) {
    return "FizzBuzz";
  }

  if (isFizz) {
    return "Fizz";
  }

  if (isBuzz) {
    return "Buzz";
  }

  return number.toString();
}

function ensureIsNumber(number: number) {
  if (isNaN(number) || !Number.isInteger(number)) {
    throw new Error("You must provide an integer number");
  }
}
