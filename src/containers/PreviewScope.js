import { connect } from 'react-redux'
import { Preview } from '../component/Preview'
import { headBlock } from './HeadProc'
const mapStateToProps = state => {
    //headBlock(state.theadPaks)
    return {
        headBlock: headBlock(state.theadPaks),
        tableName: state.tableInfo.tableName
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
        }
    }
}
export const PreviewScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview)
