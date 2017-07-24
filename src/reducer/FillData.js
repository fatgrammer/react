export const fillData = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FloatingData':
            console.log('action',action.data)
            return [ ...state,action.data]
        default:
            return state
    }
}