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
    static traverse(root) {
        let stack = []
        for (let i = 1; i <= 3; ++i) {
            TableTrie.traverseBase(root, i, stack)
        }
        printStack(stack);
    }
    static traverseBase(node, level, stack) {
        debugger
        if (!node) {
            return
        }
        if (level === 1) {
            // console.log(node.head())
            stack.push(node)
        } else {
            while (node.child() !== null) {
                TableTrie.traverseBase(node.child(), level - 1,stack)
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
            root.children.map(ch => {
                TableTrie.findAndInsert(ch, des, dir);
            })
            root.width = root.children.map(ch => ch.width).reduce((prev, next) => {
                let pWidth = prev || 1
                return pWidth + next;
            }, 0)
        }
    }
    static sFindSert(root, des, dir) {
        let node = root
        des.slice(1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
        })
        node.children.push(new TableTrie(des.concat(dir), 1))
        node.width = calcWidth(node)
        root.width = calcWidth(root)
    }
}
function calcWidth(node) {
    return node.children.map(ch => ch.width).reduce((prev, next) => {
        const pWidth = prev || 1
        return pWidth + next
    })
}
function printStack(stack = []) {
    // stack.map(e => e.headPrefix).forEach(a => {
    //     a.forEach(f => {
    //         console.log(f)
    //     })
    //     console.log('-------')
    // })
    stack.forEach(ele=>{
        console.log(ele)
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
        let root = new TableTrie(['A'], 1)
        TableTrie.sFindSert(root, ['A'], 'B');
        TableTrie.sFindSert(root, ['A'], 'C');
        TableTrie.sFindSert(root, ['A'], 'D');
        TableTrie.sFindSert(root, ['A', 'C'], 'E');
        TableTrie.sFindSert(root, ['A', 'C'], 'F');
        TableTrie.sFindSert(root, ['A', 'D'], 'E');
        TableTrie.sFindSert(root, ['A', 'D'], 'F');
        TableTrie.sFindSert(root, ['A'], 'E');
        TableTrie.prefixTraverse(root);
        TableTrie.traverse(root)

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
