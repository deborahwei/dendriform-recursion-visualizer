import { setAttributes, svgNameSpace} from "../utilities/util";
import Arrow from "./arrow";
import NavSteps from "./nav_steps";
import TreeNode from "./tree_node";

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
        this.addNavButtonListeners()


        this.arrows = {}
        this.nodes = {}

        this.steps = []
        this.currentStep = 0 
    };


    async animate(node) {
        this.generateTree(node); // puts elements on document, but invisible for now
        await this.showNodes(node)
        await this.showAnswer(node)
        console.log(this.steps)
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
        this.addStep(treeNode)
        await treeNode.show() 

        for (let child of node.children) {
            let arrow = this.arrows[`line-${child.id}`]
            await arrow.show()
            this.addStep(arrow)
            await this.showNodes(child)
            await arrow.return(this.nodes[`node-${child.id}`])
            this.addStep(arrow)
        }
    }

    addStep(value) {
        this.steps.push(value)
    }

    doStep(object, hiddenSteps) { 
        if (object instanceof Arrow) {
            let count = 0 // counts how many instances of the arrow in hidden steps
            hiddenSteps.forEach( (step) => { 
                if (step.id && step.id === object.id) {
                    count += 1 
                }
            })
            if (count === 1) { // if it only shows once that means the arrow hasn't returned
                object.show()
                object.unflipCoors()
                object.setReturn(false)
            }
            else { 
                object.show()
                const arrowId = object.getId()
                const nodeReturning = this.nodes[`node-${arrowId[arrowId.length - 1]}`]
                object.return(nodeReturning)
                object.unhideReturn()
                object.setReturn(true)
            }
            if (this.currentStep === this.steps.length) {
                console.log(this.currentStep)
                this.nodes[`node-0`].completed()
            }
        }
        else if (object instanceof TreeNode) {
            object.setComplete(false)
            object.show()
        }
    }

    undoStep(object, hiddenSteps) {
        if (object instanceof Arrow) {
            let count = 0 // counts how many instances of the arrow in hidden steps
            hiddenSteps.forEach( (step) => { 
                if (step.id && step.id === object.id) {
                    count += 1 
                }
            })
            if (count === 1) { // if it only shows once that means the arrow hasn't returned
                object.show()
                object.hide()
            }
            else { 
                object.hide()
            }
            object.setReturn(false)
        }
        else if (object instanceof TreeNode) {
            object.setComplete(false)
            object.hide()
        }
    }

    addNavButtonListeners() { 
        this.navSteps.addClickEventListener('beginningButton', () => {
            this.currentStep = 0;
            this.jumpToStep(this.currentStep);
        })
        this.navSteps.addClickEventListener('previousStepButton', () => {
            if (this.currentStep < this.steps.length) this.jumpToStep(--this.currentStep);
        })
        this.navSteps.addClickEventListener('nextStepButton', () => {
            if (this.currentStep < this.steps.length) this.jumpToStep(++this.currentStep);
        })
        this.navSteps.addClickEventListener('endButton', () => {
            this.currentStep = this.steps.length - 1
            this.jumpToStep(this.currentStep + 1)
        })
    }

    jumpToStep(step) {
        const hiddenSteps = this.steps.slice(step)
        for (let i = 0; i < this.steps.length; i++) {
            if (i < step) {
                this.doStep(this.steps[i], hiddenSteps)
            }
            else {
                this.undoStep(this.steps[i], hiddenSteps)
            }
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
};