import { connect } from 'react-redux'
import { Result } from '../component/Result'
const mapStateToProps = state => {
    return {
        headBlock: fullHeadBlock(state.theadPaks),
        head: state.tableInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResultClick: (url, data) => {
            dispatch({
                type: 'RESULT',
                url,
                data
            })
        },
        TEST: (url, tableName) => {
            dispatch({
                type: 'TABLE_HEADS',
                url,
                tableName
            })
        },

    }
}
export const ResultScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(Result)


/////////////////////////////////////////////////////////
// preprocessing tools
////////////////////////////////////////////////////////

const fullHeadBlock = (metaData) => {
    return metaData.map(ele => {
        return {
            data: ele.trie.inOrderFullData()
        }
    })
}