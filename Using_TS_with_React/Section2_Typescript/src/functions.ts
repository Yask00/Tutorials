// Overloads

function calcArea(width: number, height: number): number;
function calcArea(length: number): number;
function calcArea(...args: number[]): number {
    if (args.length === 2) {
        console.log('alalal');
        return args[0] * args[1];
    }
    return Math.pow(args[0], 2);
}

calcArea(2, 4)
console.log('asdasdasdasd');