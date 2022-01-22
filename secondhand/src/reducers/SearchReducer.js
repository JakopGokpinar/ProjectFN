const SearchReducer =  (state = {}, action) => {
    switch (action.type) {
        case "CLEAR":
            console.log("clearing filters");
            return {};
        case "PRICE_MIN":
            return {
                ...state,
                price_min: action.payload
            };        
        case "PRICE_MAX":
            return {
                ...state,
                price_max: action.payload
            }
        default:
            return state;
    }
}
export default SearchReducer;