import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/treeNode";
import ControllerContainer from "./controller/controllerContainer";
import FuncRunner from "./computer/funcRunner";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const graph = new Graph();
    const controller = new ControllerContainer();
    const treeNode = new TreeNode(25, 25, 5, 1, 5);

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    graph.addDOMElement(treeNode.getDOMObject());
    const fibFn = `
        if (n == 0 || n == 1)
          return n
        
        return fn(n-1) + fn(n-2)
    `
    const fR = new FuncRunner("n", fibFn, 5);
    console.log(fR.runFunc(5));
});