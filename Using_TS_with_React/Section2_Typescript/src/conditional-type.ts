type SomeType = number;
type MyConditionalType = SomeType extends string ? string : null;

function someFunction<T>(value: T) {
    const someOtherFunction = (someArg: T extends boolean ? 'Type A' : 'TypeB') => { };
    return someOtherFunction;
}

const result = someFunction(true);