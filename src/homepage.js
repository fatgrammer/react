import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import jquery from 'jquery'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const centralize = { textAlign: 'center' }
export const URL = "http://192.168.1.102:8000/"

export class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      str: [],
      ctxt: '',
      cPage: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clickNum = this.clickNum.bind(this)
  }
  componentWillMount() {
    this.getPageCount()
    this.fetchList()
  }
  fetchList() {
    jquery.getJSON(URL + "pagelist/0", null, (data) => {
      this.setState(
        {
          str: data
        }
      )
    })
    jquery.getJSON(URL + "count", null, (data) => {
      this.setState(
        {
          count: data
        }
      )
    })
  }
  getPageCount() {
    jquery.getJSON(URL + "pageCount", null, (data) => {
      this.setState({
        pageCount: data
      })
    })
  }
  fetchWithPage(pageNum) {
    jquery.getJSON(URL + "pagelist/" + pageNum, null, (data) => {
      this.setState({
        str: data
      })
    })
  }

  handleChange(e) {
    this.setState({
      ctxt: e.target.value
    })
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      jquery.getJSON(URL + "trans/" + this.state.ctxt, null, (data) => {
        this.setState({
          ctxt: ''
        })
        this.fetchList()
      })
    }
  }
  handleClick(word) {
    jquery.ajax({
      url: URL + "list/" + word,
      type: "POST",
      success: (res) => {
        this.fetchWithPage(this.state.cPage - 1)
      }
    })
  }
  clickNum(e) {
    const pNum = e.target.innerText
    this.fetchWithPage(pNum - 1)
    this.setState({
      cPage: pNum
    })
  }

  render() {
    let lid = 0
    return (
      <MuiThemeProvider>
        <div style={centralize}>
          <div name="Top" style={{ 'fontSize': '3em' }}>Word Count ... {this.state.count}</div>
          <div ><Link style={{ 'color': 'red', 'position': 'absolute', 'marginLeft': '8em', 'fontSize': '2em' }}
            to='/flashing' >
            Flashing
          </Link></div>
          <a
            style={{
              position: "fixed", left: "90%", top: "80%", cursor: "pointer",
              fontSize: "1.5em", height: "2em", width: "8em", backgroundColor: "wheat"
            }}
            href="#Top"
          >Back Top</a>
          <TextField value={this.state.ctxt} hintText="I'm here..."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress} />
          <br />
          {Array(this.state.pageCount).fill().map((_, i) => {

            return <FloatingActionButton secondary={this.state.cPage - 1 === i} key={i} mini={true} onClick={this.clickNum}>{i + 1}</FloatingActionButton>
          }
          )}
          <br />
          <br />
          <Table style={{ tableLayout: 'auto' }} selectable={false} fixedHeader={false} >
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={centralize}>WORD</TableRowColumn>
                <TableRowColumn>PHONETIC</TableRowColumn>
                <TableRowColumn>EXPLAINS</TableRowColumn>
                <TableRowColumn>QCOUNT</TableRowColumn>
                <TableRowColumn>DELETE</TableRowColumn>
              </TableRow>
              {this.state.str.map(e => {
                const word = e["_id"]
                const explains = e["explains"]
                const phonetic = e['phonetic']
                const qCount = e['qCount'] || 0
                return <TableRow key={lid++}>
                  <TableRowColumn style={centralize} >{word}</TableRowColumn>
                  <TableRowColumn style={centralize} >{phonetic}</TableRowColumn>
                  <TableRowColumn style={{ whiteSpace: "pre", paddingTop: "10px", paddingBottom: "-20px" }}>
                    {typeof explains === 'string' ? explains : explains.map(e => e + '\n ')}
                  </TableRowColumn>
                  <TableRowColumn>{qCount}</TableRowColumn>
                  <TableRowColumn style={{ width: "20px" }}>
                    <RaisedButton label="D" secondary
                      onClick={(e) => this.handleClick(word)}>
                    </RaisedButton>
                  </TableRowColumn>
                </TableRow>
              })
              }
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    )
  }
}