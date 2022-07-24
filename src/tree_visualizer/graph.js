import { setAttributes, svgNameSpace} from "../utilities/util";
import Arrow from "./arrow";
import NavSteps from "./nav_steps";

export default class Graph {
    constructor() {
        this.graphContainer = document.createElement("div");
        this.graphContainer.classList.add("graph-container");

        this.navSteps = new NavSteps()

        this.graphWindow = document.createElementNS(svgNameSpace, "svg");
        setAttributes(this.graphWindow, {
            "viewBox": `0 0 100 100`,
            "width": "100%",
            "height": "100%"
        });

        this.graphContainer.appendChild(this.navSteps.getDOMElement())
        this.graphContainer.appendChild(this.graphWindow);


        this.arrows = {}
        this.nodes = {}

    };


    async animate(node) {
        this.generateTree(node); // puts elements on document, but invisible for now
        await this.showNodes(node)
        await this.showAnswer(node)
    }

    generateTree(node) { 
        node.traverse(cur => { // generate nodes
            for (let child of cur.children) { // generate arrows
                let endCoor = [child.x, child.y] 
                let arrow = new Arrow (child.id, child.result, [cur.x, cur.y], endCoor)
                this.arrows[arrow.getId()] = arrow
                arrow.hide() // hide them 
                this.graphWindow.appendChild(arrow.getDOMObject())
            }
        })
        node.traverse(cur => { 
            this.graphWindow.appendChild(cur.getDOMObject())
            let treeNode = cur.getTreeNode()
            this.nodes[`node-${cur.id}`] = treeNode
            treeNode.hide() // hide nodes
        })
    }

    async showNodes(node) {
        let treeNodeKey = `node-${node.id}`
        let treeNode = this.nodes[treeNodeKey] 
        // this.addStep(treeNodeKey)
        await treeNode.show() 

        for (let child of node.children) {
            let arrow = this.arrows[`line-${child.id}`]
            await arrow.show()
            // this.addStep(`line-${child.id}`)
            await this.showNodes(child)
            await arrow.return(this.nodes[`node-${child.id}`])
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

    showAnswer(node) {
        this.nodes[`node-0`].completed()
        console.log(node.result)
    }

    // backStep(node) {
        
    // }

    // forwardStep()

};