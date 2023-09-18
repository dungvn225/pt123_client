



export const getNumbersFromString=(str)=> {
  const regex = /\d+/g; 
  const matches = str.match(regex); 
  const numbers = matches.map((match) => parseInt(match));
  return numbers;
}

const str = "Chuỗi có 123 và 456 và 789";
const numbers = getNumbersFromString(str);

