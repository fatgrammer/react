import { connect } from 'react-redux'
import { FillTable } from '../component/FillTable'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        tableType: state.tableInfo.tableType,
        floatingData: state.fillData.floatingData,
        tableRule: state.dataRule
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addLine: (data) => dispatch({
            type: 'ADD_FloatingData',
            data
        }),
        fetchRule:(url,tableName) => dispatch({
            type: 'FETCH_RULE',
            url,
            tableName
        })
    }
}
export const FillScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(FillTable)


