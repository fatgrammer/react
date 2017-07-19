import { connect } from 'react-redux'
import { Preview } from '../component/Preview'
import { headBlock, calcMaxDepth } from './HeadProc'
const mapStateToProps = state => {
    const maxDepth = calcMaxDepth(state.theadPaks);
    return {
        headBlock: headBlock(state.theadPaks),
        tableName: state.tableInfo.tableName,
        tableType: state.tableInfo.tableType,
        maxDepth: maxDepth,
        fixHead: state.tableInfo.fixHead
        ///warning
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddClick: (id) => {
            dispatch({
                type: 'ADD',
                id
            })
        },
        onHeadClick: (id) => {
            dispatch({
                type: 'POP_HEAD',
                id
            })
        },
        onDataClick: (fieldId, name) => {
            dispatch({
                type: 'POP_RULE',
                fieldId,
                name
            })
            dispatch({
                type: 'SHOW_RULEBOX'
            })
        },
        onNameChange: (tableName) => {
            dispatch({
                type: 'TABLE_NAME',
                tableName
            })
        },
        onTypeChange: (tableType) => {
            dispatch({
                type: 'TABLE_TYPE',
                tableType
            })
        },
        // changeMaxDepth: (maxDepth) => {
        //     dispatch({
        //         type: 'MAX_DEPTH',
        //         maxDepth
        //     })
        // },
        onFixHeadChange: (id, text) => {
            dispatch({
                type: 'ALT_FIXHEAD',
                id,
                text,

            })
        },
        //globle rule
        showGRule:()=>{
            dispatch({
                type: 'SHOW_GRULEBOX'
            })
        }
    }
}
export const PreviewScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview)
