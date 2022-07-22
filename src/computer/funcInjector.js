export default function getSourceCode(originalCode, params) {
    const bottomLines = `
        fn(${params});
        return errorMessage ?? treeData;
    `;
    return [originalCode,
            injectedFunc,
            bottomLines
            ].join("\n");
}

const injectedFunc = `
const stack = [];
const treeData = {};
const MAX_CALL_STACK_SIZE = 200;
let errorMessage = null;
let nodeId = -1;

function fn(...args) {
    if (MAX_CALL_STACK_SIZE < stack.length || errorMessage != null) {
        errorMessage = "MAXIMUM CALL STACK EXCEEDED";
        return null;
    }
    nodeId++;

    const currNode = {
        input: args,
        result: null,
        children: []
    }
    treeData[nodeId] = currNode;

    if (stack.length)
        treeData[stack[stack.length-1]].children.push(nodeId);
    
    stack.push(nodeId);
    currNode.result = _fn(...args);
    stack.pop();
    return currNode.result;
}
`;

