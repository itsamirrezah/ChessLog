const metric = ["", "K", "M", "B"];

export default function abbreviatedNumber(input) {
  if (!input) return "";
  const number = +input;

  let index = 0;
  let result = number;
  while (result >= 1000) {
    result = result / 1000;
    index++;
  }

  return Math.floor(result * 10) / 10 + "" + metric[index];
}
