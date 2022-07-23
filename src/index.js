import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/tree_node";
import ControllerContainer from "./controller/controllerContainer";
import FuncRunner from "./computer/funcRunner";
// import NodePosition from "./tree_visualizer/nodePosition.js"
import PositionCalculator from "./tree_visualizer/position_calculator.js";

const SCREEN_SIZE = 400;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const controller = new ControllerContainer();
    const graph = new Graph(SCREEN_SIZE);
    const treeNode = new TreeNode(25, 25, 5, 1, 5);

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    const argsInput = "a, n"
    const fibFn = `
    if (n == 0)
    return 1
  
    if (n % 2 == 0)
    return fn(a*a, n/2)
  
    return a * fn(a*a, (n-1)/2)
    `

    const fR = new FuncRunner(argsInput, fibFn, [2, 5]); 
    const treeData = fR.runFunc()
    const positionCalculator = new PositionCalculator(treeData, SCREEN_SIZE)
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