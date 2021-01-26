type Alias1 = string | number | boolean;
type Alias2 = { a: number } & { b: number };
type Alias3<T> = T[];

type Alias4 = {
    a: number;
    b: number;
}

// Note 
// With alias create a name that references this shape of an objecr
// With interface we create new type