import { MIN_NAME_LENGTH } from "../common/constants"

const isNameValid = (name: string) => {
  if(name.length < MIN_NAME_LENGTH) {
    throw new Error();
  }

  return true;
}

// const isInputValid = (input: string) => {
//   if(input === "") {
//     return false;
//   }

//   return true;
// }