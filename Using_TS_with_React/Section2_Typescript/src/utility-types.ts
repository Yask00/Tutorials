// Partial
interface Starship {
    name: string;
    enableHyperJump: boolean;
}

const updateStarship = (id: number, starship: Partial<Starship>) => { }

updateStarship(1, {
    name: "Explorer",
    // enableHyperJump: true
});

// Required
// Readonly
// Record

const starships : Record<string, Starship> = {
    Explorer1: {
        name: "Explorer1",
        enableHyperJump: true,
    },
    Explorer2: {
        name: "Explorer2",
        enableHyperJump: false,
    }
}

// Pick
type StarshipNameOnly = Pick<Starship, "name">;
// Omit != Pick
type StarshipWithoutName = Omit<Starship, "name">;


// Exclude
// Extract != Exclude
// NonNullable
// ReturnType
// InstanceType
// ThisType