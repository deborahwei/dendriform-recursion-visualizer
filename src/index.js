import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/tree_node";
import ControllerContainer from "./controller/controllerContainer";
import FuncRunner from "./computer/funcRunner";
import PositionCalculator from "./tree_visualizer/position_calculator.js";


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const controller = new ControllerContainer();
    const graph = new Graph();
    const treeNode = new TreeNode(25, 25, 5, 1, 5);

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    const argsInput = "n"
    const fibFn = `
    if (n == 0 || n == 1)
    return n
  
    return fn(n-1) + fn(n-2)
    `

    const fR = new FuncRunner(argsInput, fibFn, [3]); 
    const treeData = fR.runFunc()
    console.log(treeData)
    const positionCalculator = new PositionCalculator(treeData)
    graph.resizeViewBox(positionCalculator.getTreeDimensions())
    graph.dfs(positionCalculator.getRoot());
    
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