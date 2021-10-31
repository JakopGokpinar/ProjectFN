const LoginReducer =  (state = {}, action) => {
    switch (action.type) {
        case "user":
            console.log(action.payload)

            return{
                ...action.payload
            }            
        default:
            return state;
    }
}
export default LoginReducer;