/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import React from "react";
import { mergeSort } from "../SortingAlgorithms/MergeSort.js";

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
    for (let i = 0; i < 25; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    this.setState({ array });
  }

  mergeSort() {
    const javaSortedArray = this.state.array
      .slice()
      .sort((a, b) => a - b);
    const sortedArray = mergeSort(this.state.array, 0, this.state.array.length - 1);

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
          <button className="btn" onClick={() => {this.mergeSort()}}>Merge Sort</button>
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