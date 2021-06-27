
export const login = (state=false , action) => {
    switch(action.type) {
        case "LOGIN":
            state = action.payload;
            return state;
        default:
            return state;
    }
}