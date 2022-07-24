# React-Star-Rating-Component

React-Star-Rating-Component is a simple to use yet completely customizable component for using Rating/Reviews.

  - Fully CSS customizable - Change number of star, color, size and space between star ratings

### Installation

This requires [React.js and Prop-Types] to run.
```sh
npm i react-star-ratings-component
```

### Demo

[Sandbox link to Play with](https://codesandbox.io/s/react-star-rating-0mt5m)

### How to Use

Install and import react-star-ratings-component and pass the props as per the below table
```sh
import React from "react";
import ReactStarRating from "react-star-ratings-component";

const App = () => {
  return (
    <ReactStarRating
      numberOfStar={10}
      numberOfSelectedStar={2}
      colorFilledStar="red"
      colorEmptyStar="black"
      starSize="20px"
      spaceBetweenStar="10px"
      disableOnSelect={false}
      onSelectStar={val => {
        console.log(val);
      }}
    />
  );
};
export default App;
```
### Prop-Types

Details of the Props to be passed:

| Prop-name | Type | Description |
| ------ | ------ | ------ |
|numberOfStar | Number |  This determines the maximum number of Stars or Rating in the Component.
|numberOfSelectedStar | Number | This determines the number of Stars or Rating selected in the Component.
|numberOfStar | Number | This determines the maximum number of Stars or Rating in the Component.
|colorFilledStar | string |  Color of selected Stars or Rating.
|colorEmptyStar | string |  Color of Stars or Rating.
|starSize | string |  This determines the size of the Star or Rating.
|colorEmptyStar | string |    This determines the space between the Star or Rating.
|disableOnSelect | boolean |  Disable or enable the user action in the component.
|onSelectStar | func |  Callback function which returns the position of nth star on click of the component 

### Default proptypes
```sh
ReactStarRating.defaultProps = {
  numberOfStar: 5,
  colorFilledStar: "orange",
  colorEmptyStar: "#000",
  starSize: "20px",
  spaceBetweenStar: "10px",
  disableOnSelect: true
};

```
