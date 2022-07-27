import { setAttributes, svgNameSpace} from "../utilities/util";
import Arrow from "./arrow";
import { TIME_GAP } from "./constants";
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

        this.graphContainer.appendChild(this.navSteps.getDOMObject())
        this.graphContainer.appendChild(this.graphWindow);
        this.addNavButtonListeners()

        this.arrows = {}
        this.nodes = {}

        this.steps = []
        this.currentStep = 0 
        this.noSkip = true
    };

    reset() { 
        this.graphWindow.innerHTML = ''
        this.arrows = {}
        this.nodes = {}

        this.steps = []
        this.currentStep = 0 
        this.noSkip = true
    }


    async animate(node) {
        this.generateTree(node); // puts elements on document, but invisible for now
        this.addElementsToHash(node)
        for (let i = 0; i < this.steps.length; i++) { 
            this.currentStep = i
            if (this.noSkip) {
                const doSteps = this.steps.slice(0, i + 1)
                await this.doStep(this.steps[i], doSteps)
            }
        }
    }

    generateTree(node) { 
        node.traverse(cur => { // generate nodes
            for (let child of cur.children) { // generate arrows
                let endCoor = [child.x, child.y] 
                let arrow = new Arrow (child.id, child.result, [cur.x, cur.y], endCoor)
                this.arrows[`line-${arrow.getId()}`] = arrow
                arrow.hideCallArrow() // hide them 
                this.graphWindow.appendChild(arrow.getDOMObject())
            }
        })
        node.traverse(cur => {  // generate nodes
            this.graphWindow.appendChild(cur.getDOMObject())
            let treeNode = cur.getTreeNode()
            this.nodes[`node-${cur.id}`] = treeNode
            treeNode.hideProcessingNode() // hide nodes
        })
    }

    addElementsToHash(node) { // adds in dfs order which is call order
        let treeNodeKey = `node-${node.id}`
        let treeNode = this.nodes[treeNodeKey] // add node to hash
        this.steps.push(treeNode) // add step to hash
        for (let child of node.children) {
            let arrow = this.arrows[`line-${child.id}`]
            this.steps.push(arrow)
            this.addElementsToHash(child)
            this.steps.push(arrow)
        }
    }
    
    addNavButtonListeners() { 
        this.navSteps.addClickEventListener('beginningButton', () => {
            this.currentStep = 0;
            this.jumpToStep(this.currentStep);
        })
        this.navSteps.addClickEventListener('previousStepButton', () => {
            if (0 <= this.currentStep - 1) this.jumpToStep(--this.currentStep);
        })
        this.navSteps.addClickEventListener('nextStepButton', () => {
            if (this.currentStep + 1 < this.steps.length) this.jumpToStep(++this.currentStep);
        })
        this.navSteps.addClickEventListener('endButton', () => {
            this.noSkip = false
            this.currentStep = this.steps.length - 1
            this.jumpToStep(this.currentStep)
        })
    }

    jumpToStep(step) { 
        const doSteps = this.steps.slice(0, step + 1) 
        const hiddenSteps = this.steps.slice(step + 1)
        for (let i = 0; i < this.steps.length; i++) {
            if (i <= step) {
                this.doStep(this.steps[i], doSteps)
            }
            else if (i > step) {
                this.undoStep(this.steps[i], hiddenSteps)
            }
        }
    }

    doStep(object, doSteps) { 
        return new Promise(resolve => {
            setTimeout (() => {
                if (object instanceof Arrow) {
                    let count = 0
                    doSteps.forEach( (step) => { 
                        if (step.id === object.id) {
                            count += 1
                        }
                    })
                    if (count === 1) {
                        // if there is only one return call arrow
                        object.showCallArrow() 
                        object.setReturn(false)
                    }
                    else if (count === 2) {
        
                        const arrowId = object.getId() // node that becomes complete has the same id as arrow
                        const nodeReturning = this.nodes[`node-${arrowId}`]
                        object.showReturnArrow(nodeReturning)
                        object.setReturn(true)
                    }
                }
                else if (object instanceof TreeNode) {
                    object.showProcessingNode()
                    object.setComplete(false)
                }
                if (this.currentStep === this.steps.length - 1) {
                    this.nodes[`node-0`].showCompletedNode()
                }
                resolve()
            }, TIME_GAP) 
        })
    }

    undoStep(object, hiddenSteps) {
        if (object instanceof Arrow) {
            let count = 0
            hiddenSteps.forEach( (step) => { 
                if (step.id === object.id) {
                    count += 1
                }
            })
            if (count === 1) { 
                const arrowId = object.getId() // node that becomes complete has the same id as arrow
                const nodeReturning = this.nodes[`node-${arrowId}`]
                object.hideReturnArrow(nodeReturning)
            }
            else if (count === 2) {
                object.hideCallArrow()
            }
            object.setReturn(false)
        }
        else if (object instanceof TreeNode) {
            object.setComplete(false)
            object.hideProcessingNode()
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