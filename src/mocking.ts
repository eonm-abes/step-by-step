import { Pm } from './pm'

let pm = new Pm();

import { stepByStep } from './index'

let steps = new stepByStep([
    (data) => {
        console.log(`current iteration : ${data.count}`)
        return {a: "e"}
    },
    (data) => {
        console.log(`current iteration : ${data.count}`)
        // return {a: "i"}
    },
    (data) => {
        console.log(`current iteration : ${data.count}`)
        // return {a: "i"}
    }
]);

steps.run();
console.log(steps.data())
steps.run();
console.log(steps.data())
steps.run();
console.log(steps.data())