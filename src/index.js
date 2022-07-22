import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/treeNode";
import ControllerContainer from "./controller/controllerContainer";
import FuncRunner from "./computer/funcRunner";
// import NodePosition from "./tree_visualizer/nodePosition.js"
import TreeRenderer from "./tree_visualizer/treeRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const graph = new Graph();
    const controller = new ControllerContainer();
    const treeNode = new TreeNode(25, 25, 5, 1, 5);

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    graph.addDOMElement(treeNode.getDOMObject());
    const argsInput = "n"
    const fibFn = `
        if (n == 0 || n == 1)
          return n
        
        return fn(n-1) + fn(n-2)
    `
    const fR = new FuncRunner(argsInput, fibFn, 3); 
    const treeData = fR.runFunc(3)
    const tree = new TreeRenderer(treeData)
    console.log(tree.deepestLevel)
    // console.log(tree.rootNode.id)
    // console.log(treeData)
    // const node = new NodePosition(0, treeData)
    // const a = getPosition(0, 0, null)
    // console.log(a.rootNode)

    

    // testing 
    // console.log(fR.getFunc());
    // console.log(fR.runFunc(5)); 
    // function iterate(data) {
    //   Object.keys(data).forEach ((node) => {
    //     console.log(data[node].children)
    //   })
    // }
});