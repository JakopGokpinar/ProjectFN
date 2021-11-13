const userReducer =  (state = {}, action) => {
    switch (action.type) {
        case "user/save":
            console.log(action.payload)
            return{
                ...action.payload
            }           
        case "user/remove":
            return {}; 
        default:
            return state;
    }
}
export default userReducer;