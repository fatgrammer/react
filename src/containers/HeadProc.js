import { store } from '../index.js'
export const headBlock = (metaData = []) => {
    const maxDepth = calcMaxDepth(metaData);
    return metaData.map(ele => {
        return {
            data: boxHeight(ele.trie.inOrderData(), maxDepth),
            shownProp: ele.shownProp,
            id: ele.id
        }
    })
}
export const calcMaxDepth = (metaData) => {
    const maxDepth = metaData.map(headPak => { headPak.trie.inOrderData(); return headPak.trie.maxDepth }).reduce((prev, next) => {
        return prev >= next ? prev : next
    }, 0)
    return maxDepth
}
const boxHeight = (boxStacks, maxDepth) => {
    return boxStacks.map(
        boxStack => {
            const rDepth = maxDepth - boxStack[boxStack.length - 1].depth + 1
            return [...boxStack.slice(0, boxStack.length - 1),
            {
                ...boxStack[boxStack.length - 1],
                depth: rDepth //> 1 ? rDepth : 1
            },
            ...boxStack.slice(boxStack.length)
            ]
        }
    )
}