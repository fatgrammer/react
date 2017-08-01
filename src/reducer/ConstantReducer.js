export const constRef = (state = {}, action) => {
    switch (action.type) {
        case 'CONSTREF_DATA':
            return {
                data: action.data
            }
        default:
            return state
    }
}