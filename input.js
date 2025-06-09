//FOR TESTING purposes setting up Jest
export function sum(a, b) {
  return a + b;
}

//verify if the name is a string
export function verifyName(name) {
    if(typeof name === "string") 
        return true
    else
        return false
}