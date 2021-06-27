
export const users = (state =[] , action) => {
    switch(action.type) {
        case 'USERS':
            state = action.payload
            return state;
        default:
            return state
    }
}