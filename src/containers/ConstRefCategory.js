import { connect } from 'react-redux'
import { TableNameList } from '../component/TableNameList'
const mapStateToProps = state => {
    return {
        destination: 'constRef'
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
export const ConstRefCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableNameList)
