// Generic functions
function genericFunction<T>(x: T): T {
    return x;
}

const genericArrowFunction = <T>(x: T): T => x;

// Generic interfaces
interface GenericInterface<T> {
    (a: T): T;
    someprops: T;
}

interface GenericInterface<T> {
    <U>(a: U): U;
    someprops: T;
}

// Generic Classes
class GenericClass<P> {
    constructor(public props: P) { }

    getProps(): P {
        return this.props;
    }
}

// EXAMPLE GENERICS INTERFACE CLASS
interface Exprirable {
    expiryDate: Date;
}

interface ChocolateCake extends Exprirable { }
interface VanillaCake extends Exprirable { }

const chokoCakes: ChocolateCake[] = [
    { expiryDate: new Date() }
];

const vanillaCakes: VanillaCake[] = [
    { expiryDate: new Date() }
];

interface GetExpiredItemsFunction {
    <Item extends Exprirable>(items: Array<Item>): Array<Item>;
}

const getExpiredItems: GetExpiredItemsFunction = <Item extends Exprirable>(items: Array<Item>) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expiryDate.getDate() < currentDate)
}

const expiredChocoCakes = getExpiredItems<ChocolateCake>(chokoCakes);
const expiredVanillaCakes = getExpiredItems<VanillaCake>(vanillaCakes);