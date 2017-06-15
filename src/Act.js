import { createStore, combineReducers } from 'redux'
var actionCreator = function () {
    return {
        type: 'ACTION'
    }
}
var reducer_0 = function (state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}
// var store_0 = createStore(reducer_0)

var userReducer = function (state = {}, action) {
    console.log('userReducer was  called with state:', state, " and action:", action)
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }

        default:
            return state;
    }
}

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}
// console.log('store_0 state after initialization:', store_0.getState())

var reducer_1 = function (state, action) {
    console.log('reduce_1 was with state:', state, 'and action', action);
    if (typeof state === 'undefined') {
        return {}
    }
    return state;
}
// var store_1 = createStore(reducer_1)
// console.log('store_1 state after initialization:', store_1.getState())

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)
    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}
// var store_3 = createStore(reducer_3)
// console.log('store_3 state after initialization:', store_3.getState())

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store = createStore(reducer)
store.dispatch({
    type: 'AN_ACTION'
})

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}
store.dispatch(setNameActionCreator('Fat'))
console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store.getState())
export default actionCreator