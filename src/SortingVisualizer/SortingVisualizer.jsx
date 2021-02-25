/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import React from "react";
import { mergeSort } from "../SortingAlgorithms/MergeSort.js";
import Slider from '@material-ui/core/Slider';

// Min and max bar count
const MIN_BAR_COUNT = 10;
const MAX_BAR_COUNT = 100;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Array of bar heights
      array: [],

      // Number of bars
      barCount: 16,

      // Speed of animation in milliseconds
      animationSpeedMilli: 150
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.barCount; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    this.setState({ array });
  }

  setBarCountAndSpeed(count) {
    this.setState({
      barCount: count,
      animationSpeedMilli: (1 - (count - 1)/MAX_BAR_COUNT) * 150
    })
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
        }, i * this.state.animationSpeedMilli);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style
          barOneStyle.height = `${newHeight}%`
        }, i * this.state.animationSpeedMilli);
      }
    }
  }

  render() {
    const { array, barCount } = this.state;

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
        </div>
        <div className="flex space-x-2 w-1/2 max-w-6xl">
          <Slider
            defaultValue={barCount}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-bar-slider"
            step={1}
            min={MIN_BAR_COUNT}
            max={MAX_BAR_COUNT}
            valueLabelDisplay="auto"
            marks={[
              { value: MIN_BAR_COUNT, label: `${MIN_BAR_COUNT} Bars` }, 
              { value: MAX_BAR_COUNT, label: `${MAX_BAR_COUNT} Bars` },
            ]}
            onChange={(event, value) => { this.setBarCountAndSpeed(value) }}
          />
        </div>
      </>
    );
  }
}

// From Stack Overflow
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Used for slider
function valuetext(value) {
  return `${value} Bars`;
}