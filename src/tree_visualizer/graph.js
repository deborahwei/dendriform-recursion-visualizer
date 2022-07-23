import { setAttributes, svgNameSpace} from "../utilities/util";
import Arrow from "./arrow";

export default class Graph {
    constructor() {
        this.graphContainer = document.createElement("div");
        this.graphContainer.classList.add("graph-container");
        this.graphWindow = document.createElementNS(svgNameSpace, "svg");
        setAttributes(this.graphWindow, {
            "viewBox": `0 0 100 100`,
            "width": "100%",
            "height": "100%"
        });
        this.graphContainer.appendChild(this.graphWindow);
    };

    dfs(node) {
        node.traverse( cur => {
            this.graphWindow.appendChild(cur.getDOMObject());
        })
        for (let i = 0; i)
    }

    getDOMObject() {
        return this.graphContainer;
    }

    resizeViewBox(dimensions) {
        let width = dimensions[0]
        let height = dimensions[1]
        setAttributes(this.graphWindow, {
            "viewBox": `0 0 ${width} ${height}`
        })
    }

};