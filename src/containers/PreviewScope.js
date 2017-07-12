import { connect } from 'react-redux'
import { Preview } from '../component/Preview'
import { headBlock } from './HeadProc'
const mapStateToProps = state => {
    return {
        headBlock: headBlock(state.theadPaks),
        tableName: state.tableInfo.tableName,
        tableType: state.tableInfo.tableType,
        maxDepth: state.tableInfo.maxDepth
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
        }
    }
}
export const PreviewScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview)
