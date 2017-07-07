import { connect } from 'react-redux'
import { TableList } from '../component/TableList'
const mapStateToProps = state => {
    return {
        TableList: state.dataAction
    }
}
const mapDispatchToProps = dispatch => {
    return {
        tableName: (tableName) => {
            dispatch({
                type: 'TABLE_NAME',
                tableName
            })
        }
    }
}
export const TableCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableList)
