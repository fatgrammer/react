import React from 'react'
import { CellPair } from '../custom_table/CellPair'
import { combineReducers } from 'redux'
import { TableTrie, HeadProps, PropBar } from '../custom_table/HeadProps'
import { store, getDispatcher } from '../custom_table/TableApp'
import PropTypes from 'prop-types'
let barId = 0;
let fooId = 0;

const cellPair = (state, action) => {
    const idx = action.id
    switch (action.type) {
        case 'ADD_CELLPAIR':
            console.log("action ", action.id)
            return {
                id: action.id,
                cellPair: <CellPair onHeadClick={getDispatcher('POP', idx)} key={idx} id={idx} />,
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
            return alterHeadProp(state, action,
                [...state.headProps.props.bars,
                <PropBar level='_2nd'
                    onBarClick={getDispatcher('SECOND', idx, barId)}
                    deleteAction={getDispatcher('DEL_BAR', idx, barId)}
                    foos={[]}
                    id={idx} key={barId++} />]
            )
        case 'ADD_THIRD':
            const bars = state.headProps.props.bars
            return alterHeadProp(state, action,
                matchBar(bars, barId, idx)
            )
        case 'DELETE_BAR':
            console.log("ss", ...action)
            return alterHeadProp(state, action,
                [...state.headProps.props.bars.slice(0, action.barId),
                ...state.headProps.props.bars.slice(action.barId + 1)
                ])
    }
}
const matchBar = (bars, barId, idx) => {
    console.log(barId)
    return bars.map(bar => {
        if (bar.key === barId) {
            return Object.assign({}, bar, {
                foos: [...bar.props.foos,
                <PropBar level='__3rd'
                    id={idx} barId={barId} key={fooId++}
                    deleteAction={getDispatcher('DEL_BAR', idx, barId)} />]
            })
        } else {
            return bar;
        }
    })
}
const nextSec = (bars, id) => {
    const idx = bars.find(
        e => e.props.id === id)
    if (idx === undefined || idx.props.level !== '2_nd') {
        return bars[bars.length - 1].key + 1;
    } else {
        return idx.key;
    }
}
const alterHeadProp = (state, action, decBar) => {
    const stateId = state.headProps.props.id
    if (stateId !== action.id) {
        return state;
    }
    return {
        ...state,
        headProps: <HeadProps id={stateId} key={state.headProps.key}
            bars={decBar}
        />
    }
}
alterHeadProp.PropType = {
    state: PropTypes.object
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

const headProps = (state = [], action) => {

    let idx = action.id
    switch (action.type) {
        case 'ADD_CELLPAIR':
            return [...state, {
                id: action.id,
                headProps: <HeadProps
                    bars={[<PropBar onBarClick={getDispatcher('FIRST', idx)} id={idx} key={barId++} />]}
                    key={idx} id={idx} />,
                showProps: false
            }]
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
        case 'ADD_THIRD':
            return state.map(t => cellPair(t, action))
        case 'DELETE_BAR':
            return state.map(t => cellPair(t, action))
        default:
            return state;
    }
}
const theadPak = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: state.length,
                trie: new TableTrie(["th" + state.length], 0),
                shownProp: false,
                children: 0
            }];
        case 'INSERT':
            return [...state.slice(0, action.id),

            {
                ...state[action.id],
                trie: state[action.id].trie.sFindSert(
                    action.prefix,
                    action.head+ 'th' + state[action.id].trie.sFindIdx(action.prefix)),
                children: state[action.id].children + 1
            },
            ...state.slice(action.id + 1)
            ]
        case 'POP_HEAD':
            return state.map(t => {
                if (t.id !== action.id) {
                    return {
                        ...t,
                        shownProp: false
                    }
                }
                return {
                    ...t,
                    shownProp: true
                }
            })
        case 'SAVE_HEAD':
            console.log('act ', action)

            return [...state.slice(0, action.id),
            {
                ...state[action.id],
                trie: state[action.id].trie.sFindSet(action.prefix, action.value)
            },
            ...state.slice(action.id + 1)
            ]
        default:
            return state
    }
}
const popBox = (state = [], action) => {
    switch (action.type) {
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
    // cellPairs,
    // visibilityFilter,
    // headProps,
    theadPak
})

const toggleCell = () => { }
