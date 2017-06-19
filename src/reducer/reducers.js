import React from 'react'
import { CellPair } from '../custom_table/CellPair'
import { combineReducers } from 'redux'
import { HeadProps } from '../custom_table/HeadProps'
const cellPair = (state, action) => {
    switch (action.type) {
        case 'ADD_CELLPAIR':
            console.log("action ", action.id)
            const idx = action.id
            return {
                id: action.id,
                cellPair: <CellPair key={idx} id={idx} />,
                headProps: <HeadProps level="1st:" key={idx} id={idx} />,
                showProps: false
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

        case 'POP_STRUCTURE':
            return state.map(t => {
                if (t.headProps.props.id !== action.id) {
                    return {
                        ...t,
                        showProps: false
                    }
                }
                return {
                    ...t,
                    // headProps: toggleVis(state.headProps)
                    showProps: true
                }
            })
        default:
            return state;
    }
}
const headProps = (state = [], action) => {
    console.log(state)
    switch (action.type) {
        case 'ADD_SECOND':
            return [
                ...state.slice(0, action.idx + 1),
                <HeadProps level=' 2nd' />,
                ...state.slice(action.idx + 1)
            ]
        default:
            return state;
    }
}

export const validation = (state = [], action) => {
    return state;
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
    visibilityFilter,
    headProps
})

const toggleCell = () => { }
