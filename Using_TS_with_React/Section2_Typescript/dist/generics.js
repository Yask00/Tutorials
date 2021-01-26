"use strict";
// Generic functions
function genericFunction(x) {
    return x;
}
const genericArrowFunction = (x) => x;
// Generic Classes
class GenericClass {
    constructor(props) {
        this.props = props;
    }
    getProps() {
        return this.props;
    }
}
const chokoCakes = [
    { expiryDate: new Date() }
];
const vanillaCakes = [
    { expiryDate: new Date() }
];
const getExpiredItems = (items) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expiryDate.getDate() < currentDate);
};
const expiredChocoCakes = getExpiredItems(chokoCakes);
const expiredVanillaCakes = getExpiredItems(vanillaCakes);
