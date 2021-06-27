
export const tags = (state =[] , action) => {
    switch(action.type) {
        case 'TAGS':
            state = action.payload
            return state;
        default:
            return state
    }
}