<div align="center">

# Step by Step

_Runs Postman's prerequest scripts and tests step by step_

[![build](https://github.com/eonm-abes/step-by-step/actions/workflows/build.yml/badge.svg)](https://github.com/eonm-abes/step-by-step/actions/workflows/build.yml)
[![Latest Build](https://img.shields.io/badge/%F0%9F%93%A6%20lastest%20build-step%20by%20step.js-yellow)](https://github.com/eonm-abes/step-by-step/releases/latest/download/step-by-step.js)
[![GitHub release](https://img.shields.io/github/release/eonm-abes/step-by-step.svg)](https://github.com/eonm-abes/step-by-step/releases/latest)
[![Contribution Welcome](https://img.shields.io/badge/contribution-welcome-green.svg)](https://github.com/eonm-abes/step-by-step/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

# Installation

You have to copy the content of the [step-by-step.js script](https://github.com/eonm-abes/step-by-step/releases/latest/download/step-by-step.js) inside your PM global variables (`Environments > Globals`) :

| VARIABLE      | INITIAL VALUE                  | CURRENT VALUE                  |
|---------------|--------------------------------|--------------------------------|
|  `stepByStep` | `paste stepByStep script here` | `paste stepByStep script here` |

# Usage

Inside your prerequest script and/or your tests :

```js
eval(pm.globals.get("stepByStep"));

new stepByStep.stepByStep([
  (data) => {
    // this function is triggered during the first request
    console.log(`current iteration = ${data.count}`);
    
   // if a function returns an object, this object will be accessible from the following functions with data. 
    return {foo: "bar"};
  },
  (data) => {
    // this function is triggered during the second request.
    console.log(`current iteration = ${data.count}`);
    console.log(data);
  },
  (data) => {
    // this function is triggered during the third request.
    console.log(`current iteration = ${data.count}`);
  },
  (data) => {
    // this function is triggered during the fourth request.
    console.log(`current iteration = ${data.count}`);
  },
]).run();

```
