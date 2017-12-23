import React from 'react';
import { FlashDummy } from './dataDummy.js'
import { Link } from 'react-router-dom'
import { URL } from './homepage'
import $ from 'jquery'
export class Flashing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullList: [{ _id: null }],
      idx: 0,
      showExp: 'none',
      listSize: 0
    }
    this.fetchData = this.fetchData.bind(this)
    this.deleteWord = this.deleteWord.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    switch (e.key) {
      case 'ArrowRight':
        this.goNext()
        break
      case 'ArrowLeft':
        this.goPrev()
        break
      case 'ArrowDown':
        this.setState({
          showExp: ''
        })
        break;
      case 'Delete':
        this.deleteWord()
        break
      default:
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  goNext = () => {
    if (this.state.idx >= this.state.listSize) {
      return
    }
    this.setState({
      idx: this.state.idx + 1,
      showExp: 'none'
    })
  }
  goPrev = () => {
    if (this.state.idx <= 0) {
      return
    }
    this.setState({
      idx: this.state.idx - 1,
      showExp: 'none'
    })
  }
  fetchData(data) {
    this.setState({
      fullList: data,
      listSize: data.length
    })
  }
  deleteWord() {
    let word = this.state.fullList[this.state.idx]._id
    $.ajax({
      url: URL + "list/" + word,
      type: "POST",
      success: (res) => {
        this.setState({
          fullList: [...this.state.fullList.slice(0, this.state.idx), ...this.state.fullList.slice(this.state.idx + 1, this.state.length)],
          listSize: this.state.listSize - 1,
          showExp:'none'
        })
      }
    })
  }


  render() {
    let list = this.state.fullList
    return <div >
      <FlashDummy fetchData={this.fetchData} />
      <Link to='/'><h2 style={{ color: 'red' }}>Homepage</h2></Link>
      <h2>{this.state.idx + "--" + list.length}</h2>
      <div style={{
        textAlign: 'center',
        color: 'red',
        fontSize: '6em',
        fontWeight: 'bolder',
        marginTop: '10%'
      }}>
        {
          list[this.state.idx]._id
        }
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '3em',
        marginTop: '-0.5em',
        fontWeight: 'bolder'
      }}>{list[this.state.idx].phonetic}</div>
      <div style={{ textAlign: 'right' }}>
        <button style={{ zoom: '150%', backgroundColor: 'teal' }} onClick={this.deleteWord}>Del</button>
      </div>
      <div style={{ textAlign: 'right' }}>
        <button style={{ zoom: '150%' }}
          onClick={() => {
            this.setState({
              showExp: ''
            })
          }}
        >ShowExp</button>

        <button style={{ zoom: "150%" }} onClick={this.goNext}
        >next</button>
        <button style={{ zoom: "150%" }} onClick={this.goPrev}
        >prev</button>

      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '1em',
        paddingBottom: '2em',
        fontSize: '2em',
        fontWeight: 'bolder',
        whiteSpace: 'pre',
        display: this.state.showExp
      }}
      >{
          list[this.state.idx]._id === null ?
            list[this.state.idx].explains :
            list[this.state.idx].explains.map(
              ele => ele + '\n'
            )
        }</div>

    </div>
  }
}
class SlideButton extends React.Component {
  render() {
    return <div>
      <button>next</button>
    </div>
  }
}