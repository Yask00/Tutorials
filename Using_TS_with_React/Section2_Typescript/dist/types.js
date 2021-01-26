"use strict";
// Types:
//---------------------------------
// Boolean
// Number
// String
// Null
// Undefined
const myObj = new Map();
// Void
// Array
let array1 = ['x', 'y'];
let array2 = ['x', 'y'];
// Tuple
let tuple = ['str', 2];
// Enum
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Green"] = "green";
    Color["Blue"] = "blue";
})(Color || (Color = {}));
let myColor = Color.Blue;
// ANY
// Type Assertions
const email = document.getElementById('email');
if (email) {
    email.addEventListener('change', e => {
        const input = e.currentTarget;
        // const input = <HTMLInputElement>e.currentTarget;
        console.log(input.value);
    });
}
