<div align="center">

# Step by Step

_Runs Postman's prerequest scripts step by step_

[![build](https://github.com/eonm-abes/step-by-step/actions/workflows/build.yml/badge.svg)](https://github.com/eonm-abes/step-by-step/actions/workflows/build.yml)
[![Latest Build](https://img.shields.io/badge/%F0%9F%93%A6%20lastest%20build-tefgen.js-yellow)](https://github.com/eonm-abes/step-by-step/releases/latest/download/step-by-step.js)
[![GitHub release](https://img.shields.io/github/release/eonm-abes/step-by-step.svg)](https://github.com/eonm-abes/step-by-step/releases/latest)
[![Contribution Welcome](https://img.shields.io/badge/contribution-welcome-green.svg)](https://github.com/eonm-abes/step-by-step/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

# Installation


```js



```

# Usage

```js
eval(pm.globals.get("stepByStep"));

new stepByStep([
  (data) => {
    // this function is triggered during the first requeset
    console.log(`current iteration = ${data.count}`);
    
   // if a function returns an object, this object will be accessible from the following functions with data. 
    return {foo: "bar"};
  },
  (data) => {
    // this function is triggered during the second requeset.
    console.log(`current iteration = ${data.count}`);
    console.log(data);
  },
  (data) => {
    // this function is triggered during the third requeset.
    console.log(`current iteration = ${data.count}`);
  },
  (data) => {
    // this function is triggered during the fourth requeset.
    console.log(`current iteration = ${data.count}`);
  },
]).run();

```
