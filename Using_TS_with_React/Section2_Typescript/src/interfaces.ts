interface A {
    someProp: number;
}

interface B {
    someProp: number;
    // anotherProp: number;
}

let a: A = { someProp: 1};
let b: B = a;

//-------------------------
interface Profile {
    readonly name: string;
    age?: number;
}

let profile: Profile = {
    name: 'John',
}
// profile.name = 'Jim';

// Index structure
interface C {
    [key: string]: number | string;
}

// Call signature
interface Sum {
    (a: number, b: number): number;
}
const sum: Sum = (a,b) => a + b;

// Extending interfaces
interface Parent {
    a: string
}

interface Child extends Parent {
    // has a
}