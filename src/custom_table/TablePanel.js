// import React from 'react'
// import {CellPair} from './CellPair'

// import { addCellPair } from '../action/actions'
// import { connect } from 'react-redux'
// import AddCellPair from '../containers/AddCellPair'
// export default class TablePanel extends React.Component {
//     componentDidMount() {
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Panel</h1>
//                 <AddCellPair />
//                 <table className="table table-bordered">
//                     <thead>
//                         <CellPair />
//                     </thead>
//                 </table>
//             </div>
//         )
//     }
// } 
// const mapStateToProps = state => {
//     return {
//         cellPairs: cellPairs
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         onClick: () => {
//             dispatch(addCellPair)
//         }
//     }
// }
// // const TableConfig = connect(
// //     mapStateToProps,
// //     mapDispatchToProps
// // )(TablePanel)