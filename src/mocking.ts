import { Pm } from './pm'

let pm = new Pm();

import { stepByStep } from './index'

let steps = new stepByStep([
    (data) => {
        console.log(`current iteration : ${data.count}`)
    },
    (data) => {
        console.log(`current iteration : ${data.count}`)
    }
]);

steps.run();
steps.run();