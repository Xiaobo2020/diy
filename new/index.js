function myNew (Con, ...args) {
  let o = {};
  Object.setPrototypeOf(o, Con.prototype);
  let x = Con.apply(o, args);
  return x ? x : o;
}

function Person (name) {
  this.name = name;
}

const person = myNew(Person, 'Xiaobo2020');

export default myNew;
