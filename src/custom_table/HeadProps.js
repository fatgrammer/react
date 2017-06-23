import React from 'react'
import { store } from './TableApp'
import PropTypes from 'prop-types'

function* childMaker(children) {
    var i = 0;
    console.log('yield i ', i)
    return {
        next: () =>
            i < children.length ?
                { value: children[i++], done: false } :
                { done: true }
    }
}
export class TableTrie {
    constructor(head, height) {
        this.headPrefix = head
        this.children = []
        this.height = height
        this.width = 1;
        this.index = 0;
    }

    nextChild() {
        if (this.index + 1 < this.children.length) {
            return this.children[this.index + 1]
        } else {
            this.index = 0;
            return null;
        }
    }
    child() {
        if (this.index < this.children.length) {
            return this.children[this.index]
        } else {
            this.index = 0;
            return null;
        }
    }
    head() {
        return this.headPrefix[this.headPrefix.length - 1]
    }
    static stack = []
    static prefixTraverse(root) {
        TableTrie.stack.push({ head: root.headPrefix, height: root.height, width: root.width });
        if (root.children.length === 0) {
            printStack()
            TableTrie.stack.pop();
            return
        } else {
            root.children.map(ch => {
                TableTrie.prefixTraverse(ch);
            })
        }
        TableTrie.stack.pop()
    }
    static inTraverse(node) {
        let stack = [];
        do {
            while (node) {
                stack.push(node);
                node = node.children[0];
            }
            do {
                //problematic
                TableTrie.printStack(stack)

                stack.pop();
                let top = stack[stack.length - 1]
                if (top && top.nextChild() !== null) {
                    node = top.nextChild();
                    top.index += 1
                    break;
                }
            } while (stack.length)
        } while (stack.length)
    }
    inOrderData() {
        let node = this
        let stack = [];
        let data = []
        //the number of element which output after pop
        let pushCount = 0;
        do {
            while (node) {
                stack.push(node);
                pushCount += 1;
                node = node.children[0];
            }
            do {
                //problematic
                // TableTrie.printStack(stack)
                data.push(this.mapData(stack.slice(stack.length - pushCount)))
                // data.push(stack)
                pushCount = 0
                stack.pop();
               let top = stack[stack.length - 1]
                if (top && top.nextChild() !== null) {
                    node = top.nextChild();
                    top.index += 1
                    break;
                }
            } while (stack.length)
        } while (stack.length)
        return data
    }
    mapData(heads){
        return heads.map(ele=>{
            return {
                head : ele.head()
            }
        })

    }
    traverse() {
        let stacks = [3]
        for (let i = 1; i <= 3; ++i) {
            stacks[i - 1] = []
            TableTrie.traverseBase(this, i, stacks[i - 1])
        }
        printStack(stacks);
        return retStack(stacks)
    }
    static traverseBase(node, level, stack) {
        debugger
        if (!node) {
            return
        }
        if (level === 1) {
            // console.log(node.head())
            if (node.children.length) {
                node.span = 1
            } else {
                node.span = 3 - node.height
            }
            stack.push(node)
        } else {
            while (node.child() !== null) {
                TableTrie.traverseBase(node.child(), level - 1, stack)
                node.index += 1;
            }
        }
    }

    static findAndInsert(root, des, dir) {
        if (root.head() === des) {
            root.children.push(new TableTrie(dir, root.height - 1))
            root.width = root.children.map(ch => ch.width).reduce((prev, next) => {
                let pWidth = prev || 1
                return pWidth + next;
            }, 0)
            return;
        } else {
            root.children.forEach(ch => {
                TableTrie.findAndInsert(ch, des, dir);
            })
            root.width = root.children.map(ch => ch.width).reduce((prev, next) => {
                let pWidth = prev || 1
                return pWidth + next;
            }, 0)
        }
    }
    sFindSert(des, dir) {
        let node = this
        des.slice(1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
        })
        // node.height -= 1
        node.children.push(new TableTrie(des.concat(dir), node.height + 1))
        node.width = calcWidth(node)

        this.width = calcWidth(this)
    }
}
function retStack(stacks = []) {
    return stacks.map(stack =>
        stack.map(ele => ({
            headField: ele.head(),
            colSpan: ele.width,
            rowSpan: ele.span
        })
        ).reduce((prev, next) => {
            if (!prev) {
                return []
            }
            return prev.concat(next)
        }, [])
    )
}
function printStack(stacks = []) {

    stacks.forEach(stack => {
        stack.map(ele => ({
            headField: ele.head(),
            colSpan: ele.width,
            rowSpan: ele.span
        })).reduce((prev, next) => {
            return prev.concat(next)
        }, []).forEach(e =>
            console.log('stack ele ', e)
            )
        console.log('----------')
    })
}
function calcWidth(node) {
    return node.children.map(ch => ch.width).reduce((prev, next) => {
        const pWidth = prev || 1
        return pWidth + next
    })
}

export class TheadPak extends React.Component {
    render() {
        return (
            <div>
                {this.props.trie}
            </div>
        )
    }
}
export class PropBar extends React.Component {
    render() {
        let root = new TableTrie(['A'], 0)
        root.sFindSert(['A'], 'B');
        root.sFindSert(['A'], 'C');
        root.sFindSert(['A'], 'D');
        root.sFindSert(['A', 'C'], 'E');
        root.sFindSert(['A', 'C'], 'F');
        root.sFindSert(['A', 'D'], 'E');
        root.sFindSert(['A', 'D'], 'F');
        root.sFindSert(['A'], 'E');
        TableTrie.prefixTraverse(root);
        root.traverse()

        let display = {}
        if (this.props.level === '__3rd') {
            display = {
                display: 'none',
            }
        }
        return (
            <div>
                {this.props.level}<input placeholder='Head Name' />
                <button style={display} onClick={this.props.onBarClick} >Add</button>
                <button onClick={this.props.deleteAction}>Del</button>
            </div>
        )
    }
}
export const HeadProps = ({ bars }) => {
    return (
        <div >
            <h1>Head props</h1>
            {bars}
        </div>
    )
}
