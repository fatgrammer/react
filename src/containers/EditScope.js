import { connect } from 'react-redux'
import { EditBox } from '../component/EditComponents'
import {headBlock} from './HeadProc'
const mapStateToProps = state => {
    return {
        headBlock: headBlock(state.theadPaks),
        display: state.popBox
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLvlAddClick: (prefix, id, head) => {
            dispatch({
                type: 'INSERT',
                prefix,
                id,
                head
            })
        },
        onDelLvl: (id, prefix) => {
            dispatch({
                type: 'DELETE_BAR',
                id,
                prefix
            })
        },
        onDelPak: (id) => {
            dispatch({
                type: 'DELETE_PAK',
                id
            })
        },
        onCloseEdit: () => {
            dispatch({
                type: 'CLOSE_POPBAR'
            })
        },
        onInput: (prefix, value, id) => {
            dispatch({
                type: 'SAVE_HEAD',
                prefix,
                value,
                id
            })
        }
    }
}
export const EditScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBox)


