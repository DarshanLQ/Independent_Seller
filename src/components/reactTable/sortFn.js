export const sortByClarity = (a, b) => {
    const customOrder = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
    const orderForIndexVals = customOrder.slice(0).reverse();
    const aIndex = -orderForIndexVals.indexOf(a);
    const bIndex = -orderForIndexVals.indexOf(b);
    return aIndex - bIndex;
}