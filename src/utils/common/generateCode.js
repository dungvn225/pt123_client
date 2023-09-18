
import { getNumbersFromString } from "./getNumbersFromString";
export const generateCode=(str)=> {
    const numbers = getNumbersFromString(str) ;
   
    const code = numbers.join('').slice(0, 6);
    return code;
  }
  