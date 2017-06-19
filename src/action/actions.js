import React from 'react'
import {CellPair} from '../custom_table/CellPair'
let nextCellPairId = 0
export const addCellPair = () => {
    const stateBefore = [];
    const action =  {
        type: 'ADD_CELLPAIR',
        id: nextCellPairId++
    }
    
}
