import { connect } from 'react-redux'
import { TableNameList } from '../component/TableNameList'
const mapStateToProps = state => {
    return {
        TableList: state.dataAction,
        destination: '/fill'
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
export const FillCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableNameList)
