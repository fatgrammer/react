import { connect } from 'react-redux'
import { FillTable } from '../component/FillTable'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        fillData: state.fillData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addLine: (data) => dispatch({
            type: 'ADD_FloatingData',
            data
        }),
    }
}
export const FillScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(FillTable)


