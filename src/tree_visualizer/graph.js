import { setAttributes, svgNameSpace } from "../utilities/util";

export default class Graph {
    constructor() {
        this.graphContainer = document.createElement("div");
        this.graphContainer.classList.add("graph-container");
        this.graphWindow = document.createElementNS(svgNameSpace, "svg");
        setAttributes(this.graphWindow, {
            "viewBox": "0 0 100 100"
        });
        this.graphContainer.appendChild(this.graphWindow);
    };

    addDOMElement(ele) {
        this.graphWindow.append(ele);
    }

    getDOMObject() {
        return this.graphContainer;
    }
};