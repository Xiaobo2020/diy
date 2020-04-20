function swap (array, i, j) {
  array[i] = array[i] + array[j];
  array[j] = array[i] - array[j];
  array[i] = array[i] - array[j];
}
function QuickSort (array, start = 0, end = array.length - 1) {
  if (start >= end) {
    return array;
  }
  let i = start;
  let j = end;
  const x = array[start];
  while (i < j) {
    while (i < j && x < array[j]) {
      j--;
    }
    i !== j && swap(array, i, j);
    while (i < j && x >= array[i]) {
      i++;
    }
    i !== j && swap(array, i, j);
  }
  QuickSort(array, start, i - 1);
  QuickSort(array, i + 1, end);
  return array;
}

export default QuickSort;
