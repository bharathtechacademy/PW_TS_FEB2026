import {PI,add,subtract} from './1_named_exports.ts';
import {PI as pi,add as sum,subtract as sub} from './2_export_all.ts';

console.log("Value of PI: ", PI);
console.log("Addition of 5 and 3: ", sum(5,3));
console.log("Subtraction of 5 and 3: ", sub(5,3));
