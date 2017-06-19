import React from 'react'
import { store } from './TableApp'
export const CellPair = ({
    onClick,
    id
}) => {
    return (
        <tr ><th onClick={
            () => store.dispatch({
                type: 'POP_STRUCTURE',
                id: id
            })
        }>head</th><td>body</td></tr>
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
