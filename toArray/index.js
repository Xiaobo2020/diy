function toArray1 (arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

function toArray2 (arrayLike) {
  return Array.prototype.concat.call([], arrayLike);
}

function toArray3 (arrayLike) {
  return Array.prototype.splice.call(arrayLike, 0);
}

function toArray4 (arrayLike) {
  return Array.from(arrayLike);
}

const arrayLike = {
  0: '1',
  1: 2,
  2: {},
  length: 3,
};

export default {
  toArray1,
  toArray2,
  toArray3,
  toArray4,
};
