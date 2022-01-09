export const setMinPriceAction = (minPrice) => {
    return {
        type: "PRICE_MIN",
        payload: minPrice
    }
}

export const setMaxPriceAction = (maxPrice) => {
    return {
        type: "PRICE_MAX",
        payload: maxPrice
    }
}