/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import React from "react";
import { mergeSort } from "../SortingAlgorithms/MergeSort.js";

// Speed of animation in milliseconds
const ANIMATION_SPEED_MS = 25;

// Number of bars
const BAR_COUNT = 16;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    this.setState({ array });
  }

  mergeSortAnimator() {
    const animations = mergeSort(this.state.array).animations;
    for (let i = 0; i < animations.length; i++) {
      // Get the bars that are on the screen
      const arrayBars = document.getElementsByClassName('array-bar');
      // There are three operations in the animation
      // The comparison color, the original color, and the swap
      // The third operation is not a color change
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = arrayBars[barOneIdx];
        const barTwo = arrayBars[barTwoIdx];
        // const barOneStyle = arrayBars[barOneIdx].style;
        // const barTwoStyle = arrayBars[barTwoIdx].style;
        // const color = i % 3 === 0 ? 'turquoise' : 'purple'
        setTimeout(() => {
          barOne.classList.toggle("bg-indigo-700");
          barTwo.classList.toggle("bg-indigo-700");
          // barOneStyle.backgroundColor = color;
          // barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style
          barOneStyle.height = `${newHeight}%`
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  testSortingAlgorithms() {
    const javaSortedArray = this.state.array
    .slice()
    .sort((a, b) => a - b);
    const sortedArray = mergeSort(this.state.array, 0, this.state.array.length - 1).array;

    // console.log(javaSortedArray);
    // console.log(sortedArray);
    console.log(arraysAreEqual(javaSortedArray, sortedArray));
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}%` }}
            ></div>
          ))}
        </div>
        <div className="flex space-x-2">
          <button className="btn" onClick={() => {this.resetArray()}}>Generate New Arrary</button>
          <button className="btn" onClick={() => {this.mergeSortAnimator()}}>Merge Sort</button>
          {/* <button className="btn" onClick={() => {this.testSortingAlgorithms()}}>Test Algorithms</button> */}
        </div>
      </>
    );
  }
}

// From Stack Overflow
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length != arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] != arrayTwo[i]) return false;
  }
  return true;
}