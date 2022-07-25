import Graph from "./tree_visualizer/graph";
import ControllerContainer from "./controller/controller_container";
import FuncRunner from "./computer/func_runner";
import PositionCalculator from "./tree_visualizer/position_calculator";
import UserInput from "./controller/user_input";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const controller = new ControllerContainer();
    const graph = new Graph();
    const userInputs = new UserInput();

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    

    // Binomial coefficient 
    // const argsInput = "n, k"
    // const fibFn = `
    // if (k == 0 || n == k)
    //     return 1
    // return fn(n-1, k-1) + fn(n-1, k)
    // `

    // const argsInput = "n"
    // const fibFn = `
    // if (n == 0 || n == 1)
    // return n
  
    // return fn(n-1) + fn(n-2)
    // `

    // const userInput = new user_input(argsInput, fibfn, [7])
    // const fR = new FuncRunner(argsInput, fibFn, [7]); 
    const treeData = userInputs.getTreeData()
    const positionCalculator = new PositionCalculator(treeData)
    graph.resizeViewBox(positionCalculator.getTreeDimensions())
    graph.animate(positionCalculator.getRoot());
    
});