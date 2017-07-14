export class TableTrie {
    constructor(head, height, value = '') {
        this.headPrefix = head
        this.children = []
        this.childNum = 0;
        this.height = height
        this.width = 1;
        this.index = 0;
        this.value = value;
        this.maxDepth = 1;
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
    static stack
    static prefixTraverse(root) {
        TableTrie.stack.push({ head: root.headPrefix, height: root.height, width: root.width });
        if (root.children.length === 0) {
            printStack()
            TableTrie.stack.pop();
            return
        } else {
            root.children.map(ch =>
                TableTrie.prefixTraverse(ch)
            )
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
                let frame = this.mapData(stack.slice(stack.length - pushCount), stack.length)
                if (frame.length) {
                    //max table colspan
                    data.push(frame);
                }
                if (stack.length > this.maxDepth) {
                    this.maxDepth = stack.length
                }
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
        // data = this.boxHeight(data, this.maxDepth)
        return data
    }
    inOrderFullData() {
        let maxDepth = 1;
        let node = this
        let stack = [];
        let data = []
        //the number of element which output after pop
        do {
            while (node) {
                stack.push(node);
                node = node.children[0];
            }
            do {
                //problematic
                // TableTrie.printStack(stack)
                let frame = stack.map(ele => {
                    return {
                        value: ele.value,
                        head: ele.head()
                    }
                })
                if (frame.length) {
                    //max table colspan
                    if (frame.length > maxDepth) {
                        maxDepth = frame.length
                    }
                    if (!stack[stack.length - 1].children.length) {
                        data.push(frame);
                    }
                }
                // data.push(stack)
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
    boxHeight(boxStacks, maxDepth) {
        return boxStacks.map(
            boxStack => {
                return [...boxStack.slice(0, boxStack.length - 1),
                {
                    ...boxStack[boxStack.length - 1],
                    depth: maxDepth - boxStack.length - boxStack[boxStack.length - 1].depth + 2
                },
                ...boxStack.slice(boxStack.length)
                ]
            }
        )
    }
    mapData(heads, stackLength) {
        const list = heads.map(ele => {
            return {
                head: ele.head(),
                prefix: ele.headPrefix,
                height: ele.height,
                depth: 1,
                width: ele.width,
                value: ele.value,
                childNum: ele.childNum
            }
        })
        if (list.length) {
            list[list.length - 1].depth = stackLength;
        }
        return list
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
        if (!node) {
            return
        }
        if (level === 1) {
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

        node.childNum += 1;
        // node.height -= 1
        node.children.push(new TableTrie(des.concat(dir), node.height + 1))
        node.width = calcWidth(node)
        this.width = calcWidth(this)
        return this;
    }
    sFindSet(des, val) {
        let node = this
        des.slice(1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
        })
        node.value = val;
        return this
    }
    sFindIdx(des) {
        let node = this
        des.slice(1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
        })
        return node.childNum;
    }

    removeSubtree(prefix) {
        let node = this
        prefix.slice(1, prefix.length - 1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
        })
        for (let i = 0; i < node.children.length; ++i) {
            if (node.children[i].head() === prefix[prefix.length - 1]) {
                //not prefect
                this.reduceWidth(prefix, node.children[i].width)
                node.children.splice(i, 1);
            }
        }
        return this;
    }
    //!call by remove node, only affect 3 level structure
    reduceWidth(prefix, dWidth) {
        let node = this
        prefix.slice(1, prefix.length - 1).forEach(d => {
            node = node.children.filter(b => {
                return b.head() === d
            })[0]
            if (node !== this) {
                if (node.children.length === 1) {
                    node.width = 1
                    this.width += 1
                } else {
                    node.width -= dWidth
                }
            }
        })
        if (this.children === dWidth) {
            this.width = 1
        } else {
            this.width -= dWidth
        }
    }
    //! need optimize
    upsertPak(values, head) {
        let node = this
        const heads = head.split('\uff04').slice(1)
        this.headPrefix[this.headPrefix.length - 1] = '\uff04' + heads.shift()
        values.slice(1).forEach(value => {
            if (!existInChildren(node, value)) {
                heads[0] > node.childNum ?
                    node.childNum = Number.parseInt(heads[0]) + 1
                    :
                    node.childNum = Number.parseInt(node.childNum) + 1
                node.children.push(
                    new TableTrie(
                        [...node.headPrefix, node.head().concat('\uff04' + heads.shift())],
                        node.height + 1, value))
                node.width = calcWidth(node)
            }   
        })
        node = node.children[node.children.length - 1]
        this.width = calcWidth(this)
    }
}

function existInChildren(node, value) {
    // console.log('in', node.value)
    return node.children.filter(t => {
        return t.value === value
    }).length
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
        // const pWidth = prev || 1
        return prev + next
    }, 0)
}

