import { setAttributes, svgNameSpace, objectToString } from "../utilities/util";
import TreeNode from "./tree_node";

export default class Graph {
    constructor(screenSize) {
        this.graphContainer = document.createElement("div");
        this.graphContainer.classList.add("graph-container");
        this.graphWindow = document.createElementNS(svgNameSpace, "svg");
        setAttributes(this.graphWindow, {
            "viewBox": `-50 8 ${screenSize} ${screenSize}`
        });
        this.graphContainer.appendChild(this.graphWindow);
    };

    dfs(node) {
        node.traverse( cur => {
            this.graphWindow.appendChild(cur.getDOMObject());
        })
        
    }

    getDOMObject() {
        return this.graphContainer;
    }
};