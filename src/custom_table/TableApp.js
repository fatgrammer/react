





// const fullHeadBlock = (metaData) => {
//     return metaData.map(ele => {
//         return {
//             data: ele.trie.inOrderFullData()
//         }
//     })
// }
// class ResultScope extends React.Component {
//     render() {
//         const hb = fullHeadBlock(this.props.content)
//         let list = {};
//         list = {
//             ...this.props.head,
//             ...list
//         }
//         list = {
//             ...list,
//             ...hb.map(headPak => {
//                 return headPak.data.map(heads => {
//                     return {
//                         [heads[heads.length - 1].head]:
//                         heads.map(head => head.value).reduce((prev, next) => {
//                             return prev + '_' + next
//                         })
//                     }
//                 })
//             }).reduce((prev, next) => {
//                 return [...prev, ...next]
//             }, []).reduce((prev, next) => {
//                 return { ...prev, ...next }
//             }, {})
//         }
//         return <div>
//             <hr />
//             <Button id='result' value='完成' onClick={
//                 atod('RESULT', {
//                     url: 'http://192.168.1.249:20080/customTable',
//                     data: { data: JSON.stringify(list) }
//                 })
//             } /><br />
//             <br /><br />
//             <hr />
//             {JSON.stringify(list)}

//             <Button id='test' value='test' onClick={
//                 atod('TABLE_HEADS', {
//                     url: 'http://192.168.1.249:20080/tableTemp/',
//                     tableName: this.props.head.tableName
//                 })
//             }
//             />
//         </div>

//     }
// }
// class RuleScope extends React.Component {
//     render() {
//         const data = this.props.metaData.filter(t => t.shown)
//         const key = data[0] ? data[0].fieldId : ''
//         const name = data[0] ? data[0].name : '';
//         const radio = data.map(dataPak => dataPak.radio)
//         const input = data.map(dataPak => dataPak.input)
//         const select = data.map(dataPak => dataPak.select)
//         const refer = select.length ? select[0] : []

//         return <div key={key}>
//             <h1>{key}------{name}</h1>
//             <table>
//                 <thead>
//                     {radio.map(rule => {
//                         return Object.entries(rule).map(ele => {
//                             return <tr>
//                                 <td>{ele[0]}</td>
//                                 <td>
//                                     <input name={ele[0]} type='radio' />true
//                                     <input name={ele[0]} type='radio' />false
//                                 </td>
//                             </tr>
//                         })
//                     })}
//                     {
//                         input.map(rule => {
//                             return Object.entries(rule).map(ele => {
//                                 return <tr>
//                                     <td>{ele[0]}</td><td><input style={{ width: '100%' }} /></td>
//                                 </tr>
//                             })
//                         })
//                     }
//                     {refer.length ? <tr key={0} >
//                         <td>reference</td>
//                         <td><select id='refBox' style={{ float: 'left' }}>
//                             {refer.map(item => {
//                                 return <option key={item}>{item}</option>
//                             })}</select>
//                             <OptionConf fieldId={key} />
//                         </td>
//                     </tr> : null
//                     }
//                 </thead>
//             </table>
//             <OptionScope options={refer} />
//             <Button onClick={atod('SAVE_RULE', {
//                 data: this.props.metaData
//             })} value='save' />
//             {/*<Button onClick={atod('FETCH_RULE',{
//                 url:'http://192.168.1.42:20080/tableRule/',
//                 tableName:this.props.name.tableName
//             })} value='get'/>*/}
//         </div>
//     }
// }
// class OptionConf extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value: ''
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
//     handleChange(event) {
//         this.setState({
//             value: event.target.value
//         })
//     }
//     handleClick() {
//         return atod('ADD_OPTION', {
//             fieldId: this.props.fieldId,
//             value: this.state.value
//         })
//     }
//     render() {
//         return <span>
//             <input style={{ float: 'left' }} onChange={this.handleChange} />
//             <Button onClick={this.handleClick()} id='addOp' value="add" />
//         </span>
//     }
// }
// class OptionScope extends React.Component {
//     render() {
//         return <div id='opScope'>
//             <span>Options</span>
//             <ul>
//                 {this.props.options.map(option => {
//                     return <li key={option}>{option}</li>
//                 })}
//             </ul>
//         </div>
//     }
// }
// class TableTitle extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             name: ''
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
//     handleChange(event) {
//         this.setState({
//             name: event.target.value
//         });
//         store.dispatch({
//             type: 'TABLE_NAME',
//             tableName: event.target.value
//         })
//     }
//     render() {
//         return <input value={this.state.name} onChange={this.handleChange} />
//     }
// }
// let newId = 0
// const TableApp = () => {
//     return (
//         <div >
//             <div style={{
//                 marginLeft: '1em'
//             }} >
//                 <div id='uname'>肥刘研究院</div>
//                 <hr />
//                 {/*<code>TableName: </code><TableTitle name={store.getState().tableInfo} />*/}
//                 <hr />
//                 <br /><br /><br />
//                 <NewScope metaData={store.getState().theadPaks} />
//                 {/*<ResultScope content={store.getState().theadPaks} head={store.getState().tableInfo} />*/}
//                 {/*<RuleScope metaData={store.getState().dataRule} name={store.getState().tableInfo} />*/}
//             </div>
//             {/*<PopScope display={store.getState().popBox} metaData={store.getState().theadPaks} />*/}
//         </div>
//     )
// }



// export default TableApp

