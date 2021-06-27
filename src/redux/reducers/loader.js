
export const load = (state=false , action) => {
    switch(action.type) {
        case "LOADER":
            state = action.payload;
            return state;
        default:
            return state;
    }
}