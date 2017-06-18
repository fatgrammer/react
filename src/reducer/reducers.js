import React from 'react'
import CellPair from '../custom_table/CellPair'
import { combineReducers } from 'redux'
const cellPair = (state, action) => {
    switch (action.type) {
        case 'ADD_CELLPAIR':
            return {
                id: action.id,
                cellPair: <CellPair />
            }
        case "TOGGLE_CELL":
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                spark: !state.spark
            }
    }
}
export const cellPairs = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CELLPAIR':
            return [
                ...state,
                cellPair(undefined, action)
            ]

        case 'TOGGLE_CELL':
            return state.map(t => cellPair(t, action))
        default:
            return state;
    }
}
export const visibilityFilter = (state = [], action) => {
    switch (action.type) {
        case 'SHOW':
            return action.filter;
        default:
            return state;
    }
}

export const cellPairApp = combineReducers({
    cellPairs,
    visibilityFilter
})

const toggleCell = () => { }
