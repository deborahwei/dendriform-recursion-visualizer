import coreJsCompat from "@babel/preset-env/data/core-js-compat";
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
        this.arrows = {}
    };

    animate(node) {
        this.generateArrows(node); // puts arrows on document, but invisible for now
        this.showNodes(node)
    }

    generateArrows(node) { 
        node.traverse(cur => {
            for (let child of cur.children) {
                let endCoor = [child.x, child.y] 
                let arrow = new Arrow (child.id, [cur.x, cur.y], endCoor)
                this.arrows[arrow.getId()] = arrow
                arrow.hide()
                this.graphWindow.appendChild(arrow.getDOMObject())
            }
        })
    }

    async showNodes(node) {
        this.graphWindow.appendChild(node.getDOMObject());
        for (let child of node.children) {
            let arrow = this.arrows[`line-${child.id}`]
            await arrow.show()
            await this.showNodes(child)
        }
    }

    async returnArrows(node) { 
        for (let child of node.children) {
            let arrow = this.arrows[`line-${node.id}`]
        }
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