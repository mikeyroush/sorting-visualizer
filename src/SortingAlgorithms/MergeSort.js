/* eslint-disable require-jsdoc */
export const mergeSort = (array) => {
  if (array.length <= 1) return array;
  const animations = [];
  merge(array, 0, array.length - 1, animations);
  return animations;
};

function merge(array, left, right, animations) {
  if (left < right) {
    // Find middle point
    const middle = Math.floor(left + (right - left) / 2);

    // sort the havles
    merge(array, left, middle, animations);
    merge(array, middle + 1, right, animations);

    // merge the sorted halves
    sort(array, left, middle, right, animations);
  }
}

function sort(array, left, middle, right) {
  // Find sizes of arrays
  const n1 = middle - left + 1;
  const n2 = right - middle;

  // Create temp arrays
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  // Copy data to temp arrays
  for (let i = 0; i < n1; i++) {
    leftArray[i] = array[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = array[middle + 1 + j];
  }

  // Merge temp arrays
  let i = 0;
  let j = 0;
  let k = left;
  while (i < n1 && j < n2) {
    // push the comparison indices to the comparison array twice
    animations.push([i, j]);
    // once to change the color and then again to change the color back
    animations.push([i, j]);
    if (leftArray[i] < rightArray[j]) {
      // we overwrite the value at pos k in the original array with the value
      // at position i in the left array
      animations.push([k, leftArray[i]]);
      array[k++] = leftArray[i++];
    } else {
      // we overwrite the value at pos k in the original array with the value
      // at position j in the right array
      animations.push([k, rightArray[j]]);
      array[k++] = rightArray[j++];
    }
  }

  // Copy remaining elements if any
  while (i < n1) {
    // push the comparison indices to the comparison array twice
    animations.push([i, i]);
    // once to change the color and then again to change the color back
    animations.push([i, i]);
    array[k++] = leftArray[i++];
  }
  while (j < n2) {
    // push the comparison indices to the comparison array twice
    animations.push([j, j]);
    // once to change the color and then again to change the color back
    animations.push([j, j]);
    array[k++] = rightArray[j++];
  }
}
