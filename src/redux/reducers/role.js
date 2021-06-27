
export const role = (state="" , action) => {
    switch(action.type) {
        case "ROLE":
            state = action.payload;
            return state;
        default:
            return state;
    }
}