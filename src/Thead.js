import React, { Component } from 'react';

class Thead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: [],
            second: []
        }
    }

    thize(obj, depth) {
        let parent = []
        let first = []
        let second = []
        Object.keys(obj).slice(1).map(function (key, index) {
            let hs = key.split("_")
            if (hs.length > 1) {
                if (!parent.includes(hs[0])) {
                    parent.push(hs[0])
                    first.push(<Th ColSpan="1" key={index} content={hs[0]} />)
                    second.push(<Th ColSpan="1" className="secondRow" key={index} content={hs[1]} />)
                } else {
                    let tmpTr = first.pop()
                    first.push(<Th ColSpan={tmpTr.props.ColSpan + 1} key={tmpTr} content={hs[0]} />)
                    second.push(<Th ColSpan="1" className="secondRow" key={index} content={hs[1]} />)
                }
            } else {
                first.push(<Th ColSpan="1" RowSpan={depth} className="firstRow" key={index} content={key} />)
            }
        })
        return [first, second];
    }

    trize(obj) {
        let depth = obj["depth"]
        let trs = this.thize(obj, depth)
        const maxRowSpan = trs.length
        return trs.map((tr, index) => <tr key={index}>{tr}</tr>)
    }
    render() {
        return (
            <thead>{this.trize(this.props.content)}</thead>
        )
    }
}
class Th extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <th  rowSpan={this.props.RowSpan} colSpan={this.props.ColSpan}>{this.props.content}</th>
    }
}

class TrTh extends Component {
    renderData() {
        return (
            <tr>
                {this.props.content.map((data, index) => <th key={index}>{data}</th>)}
            </tr>)
    }
    render() {
        return this.renderData()
    }
}
export default Thead;
