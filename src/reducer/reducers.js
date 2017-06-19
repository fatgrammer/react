import React from 'react'
import { CellPair } from '../custom_table/CellPair'
import { combineReducers } from 'redux'
import { HeadProps, PropBar } from '../custom_table/HeadProps'
import { store, getDispatcher } from '../custom_table/TableApp'
const cellPair = (state, action) => {
    switch (action.type) {
        case 'ADD_CELLPAIR':
            console.log("action ", action.id)
            const idx = action.id
            return {
                id: action.id,
                cellPair: <CellPair key={idx} id={idx} />,
                headProps: <HeadProps bars={[<PropBar dispatcher={getDispatcher('FIRST', idx)} id={idx} key={idx} />]} key={idx} id={idx} />,
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
        case 'ADD_SECOND':
            let idx_2 = ++action.id 
            if (state.headProps.props.id !== action.id) {
                return state;
            }
            console.log("t.head is ", state.headProps.props.bars.length)
            Object.values(state.headProps).map(e => {
                // console.log("hah ",e)
            })
            return {
                ...state,
                headProps: <HeadProps id={state.headProps.props.id} key={state.headProps.key}
                    bars={
                        [...state.headProps.props.bars,
                        <PropBar level='_2nd'
                            dispatcher={getDispatcher('SECOND', idx_2)}
                            key={idx_2} />]
                    } />

            }
        case 'ADD_THIRD':
            alert()
            if (state.headProps.porps.id !== action.id) {
                return state;
            }
            return {


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
                    showProps: true
                }
            })

        case 'ADD_SECOND':
            return state.map(t => cellPair(t, action))
        default:
            return state;
    }
}
// const headProps = (state = [<PropBar level='1st' />], action) => {
//     console.log("bar state ", state)
//     switch (action.type) {
//         default:
//             return state;
//     }
// }

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
    // headProps
})

const toggleCell = () => { }
