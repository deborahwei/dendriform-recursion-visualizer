export default function getSourceCode(originalCode, params) {
    const bottomLines = `
        fn(${params.join(",")});
        return treeData;
    `;
    return [originalCode,
            injectedFunc,
            bottomLines
            ].join("\n");
}

const injectedFunc = `
const stack = [];
const treeData = {};
const MAX_CALLS = 100;
let nodeId = -1;

function fn(...args) {
    if (MAX_CALLS < Object.keys(treeData).length) {
        throw "MAXIMUM NUMBER OF CALLS EXCEEDED";
    }
    nodeId++; // keeps track of what the node's unique id is 

    const currNode = {
        input: args,
        result: null,
        children: []
    }
    treeData[nodeId] = currNode; // stores the node's unique id (nodeId variable is strictly increasing) 

    // checks if stack isn't empty and then push itself as its parent's child 
    if (stack.length)
        treeData[stack[stack.length-1]].children.push(nodeId);
    
    stack.push(nodeId);
    currNode.result = _fn(...args); // runs user defined function (which might not even be recursive)
    stack.pop(); // pops off after something is return 
    return currNode.result;
}
`;