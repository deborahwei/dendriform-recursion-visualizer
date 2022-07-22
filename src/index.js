import Graph from "./tree_visualizer/graph";
import TreeNode from "./tree_visualizer/treeNode";
import ControllerContainer from "./controller/controllerContainer";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    const root = document.getElementById("root");

    const graph = new Graph();
    const controller = new ControllerContainer();
    const treeNode = new TreeNode(25, 25, 5, 1, 5);

    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());

    graph.addDOMElement(treeNode.getDOMObject());
});