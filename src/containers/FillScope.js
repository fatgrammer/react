import { connect } from 'react-redux'
import {FillTable} from '../component/FillTable'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//     }
// }
export const FillScope = connect(
    mapStateToProps,
    {}
)(FillTable)


