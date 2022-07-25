import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/tree_node";
import ControllerContainer from "./controller/controllerContainer";
import FuncRunner from "./computer/funcRunner";
import PositionCalculator from "./tree_visualizer/position_calculator";
import Arrow from "./tree_visualizer/arrow"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const controller = new ControllerContainer();
    const graph = new Graph();


    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    const argsInput = "n, k"
    const fibFn = `
    if (k == 0 || n == k)
        return 1
    return fn(n-1, k-1) + fn(n-1, k)
    `

    // const argsInput = "n"
    // const fibFn = `
    // if (n == 0 || n == 1)
    // return n
  
    // return fn(n-1) + fn(n-2)
    // `

    // if (n == 0 || n == 1)
    // return n
  
    // return fn(n-1) + fn(n-2)


// if (k == 0 || n == k)
//   return 1

// return fn(n-1, k-1) + fn(n-1, k)
// }

    const fR = new FuncRunner(argsInput, fibFn, [5, 2]); 
    const treeData = fR.runFunc()
    const positionCalculator = new PositionCalculator(treeData)
    graph.resizeViewBox(positionCalculator.getTreeDimensions())
    graph.animate(positionCalculator.getRoot());
    
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