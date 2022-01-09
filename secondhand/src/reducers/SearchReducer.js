const SearchReducer =  (state = {}, action) => {
    switch (action.type) {
        case "PRICE_MIN":
            console.log(state)
            return {
                ...state,
                price_min: action.payload
            };        
        case "PRICE_MAX":
            console.log(state)
            return {
                ...state,
                price_max: action.payload
            }
        default:
            return state;
    }
}
export default SearchReducer;