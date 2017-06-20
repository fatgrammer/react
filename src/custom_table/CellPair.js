import React from 'react'
import { store } from './TableApp'
import {connect} from 'react-redux'
export const CellPair = ({
    onHeadClick,
    id
}) => {
    return (
        <tr ><th onClick= {onHeadClick}>head</th><td>body</td></tr>
    )
}
export const PairList = ({
    pairDataList,
    onPairHeadClick
}) => (
        pairDataList.map(data => {
            <CellPair
                key={data.id}
                {...data}
                onClick={() => onPairHeadClick(data.id)}
            />
        })
    );
export const shownPop = (dataList) => {
    dataList.filter(data => {
        return data.showProps
    })
}
export const ETableApp = () => (
    <PairList
        pairDataList={store.getState().headProps}
        onPairHeadClick={id =>
            store.dispatch({
                type: 'POP',
                id
            })}
    />
)
const mapStateToProps = (state) => {
    return {
        cellPairs: store.getState().cellPairs.map(e => {
            return e.cellPair
        })
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onHeadClick: (id) => {
            dispatch({
                type: 'POP_STRUCTURE',
                id
            })
        }

    }
}
const PopedBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(CellPair)