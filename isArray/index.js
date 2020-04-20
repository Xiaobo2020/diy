function isArray (array) {
  return (
    array instanceof Array &&
    Array.prototype.isPrototypeOf(array) && 
    Object.prototype.toString.call(array) === '[object Array]' &&
    Array.isArray(array)
  );
}

export default isArray;
