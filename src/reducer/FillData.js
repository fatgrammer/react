export const fillData = (
    state = {
        fixingData: {},
        floatingData: []
    }, action) => {
    switch (action.type) {
        case 'ADD_FloatingData':
            return {
                ...state,
                floatingData: [...state.floatingData, action.data]
            }
        case 'SAVE_FILLDATA':
            return state
        default:
            return state
    }
}