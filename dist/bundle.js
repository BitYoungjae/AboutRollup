'use strict';

let num = 0;
const increase = (i = 1) => {
  return (num = num + i);
};

console.log(num); // 0
increase(10);
console.log(num);
