export const constRef = (state = {}, action) => {
    switch (action.type) {
        case 'CONSTREF_DATA':
            console.log(action.data)
            return {
                data: action.data
            }
        default:
            return state
    }
}