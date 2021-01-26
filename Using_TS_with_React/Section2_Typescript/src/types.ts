// Types:
//---------------------------------
// Boolean
// Number
// String
// Null
// Undefined

type primitiveTypes = boolean | number | string | symbol | null | undefined;
const myObj: object = new Map();

// Void
// Array
let array1: string[] = ['x', 'y'];
let array2: Array<string> = ['x', 'y'];

// Tuple
let tuple: [string, number] = ['str', 2];

// Enum
enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}

let myColor: Color = Color.Blue;

// ANY
// Type Assertions
const email = document.getElementById('email');
if (email) {
    email.addEventListener('change', e => {
        const input = e.currentTarget as HTMLInputElement;
        // const input = <HTMLInputElement>e.currentTarget;
        console.log(input.value);
    })
}