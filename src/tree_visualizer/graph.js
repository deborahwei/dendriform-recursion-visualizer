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
        this.skipToEnd = true
    };

    reset() { 
        this.graphWindow.innerHTML = ''
        this.arrows = {}
        this.nodes = {}

        this.steps = []
        this.currentStep = 0 
        this.skipToEnd = false
        this.skipToBeg = false
    }

    async animate() {
        for (const step of this.steps) {
            const {doIt, description, obj} = step;
            doIt(obj);
        }
    }
// do: add dom elements to document
// undo: remove dom elements from document
// obj: obj to act on
// description: describe step
    generateSteps(node, parent = null, callArrow = null) { 
        const initialStep = {};
        initialStep.doIt = (obj) => {
            obj.classList.add("processing");
            this.graphWindow.appendChild(obj);
        }
        initialStep.description = `fn(${node.input}) is called`;
        initialStep.obj = node.getDOMObject();
        initialStep.undoIt = (obj) => {
            this.graphWindow.removeChild(obj);
        };
        this.steps.push(initialStep);

        for (const child of node.children) {
            const callArrowStep = {};
            const arrow = new Arrow(child.id, child.result, [node.x, node.y], [child.x, child.y], false);
            callArrowStep.obj = arrow.getDOMObject();
            callArrowStep.doIt = (obj) => {
                this.graphWindow.appendChild(obj);
            }
            callArrowStep.description = `fn(${node.input}) calls fn(${child.input})`;
            callArrowStep.undoIt = (obj) => {
                this.graphWindow.removeChild(obj);
            }
            this.steps.push(callArrowStep);

            this.generateSteps(child, node, arrow.getDOMObject());
        }

        const finishedRunningStep = {};
        finishedRunningStep.obj = node.getDOMObject();
        finishedRunningStep.description = `fn(${node.input}) finished running`;
        finishedRunningStep.doIt = (obj) => {
            obj.classList.remove("processing");
            obj.classList.add("completed");
        }
        finishedRunningStep.undoIt = (obj) => {
            obj.classList.remove("completed");
            obj.classList.add("processing");
        }
        this.steps.push(finishedRunningStep);

        if (parent !== null) {
            const arrow = new Arrow(node.id, node.result,[parent.x, parent.y],[node.x, node.y], true);
            const returnArrowStep = {};
            returnArrowStep.obj = [arrow.getDOMObject(), callArrow];
            returnArrowStep.doIt = (obj) => {
                this.graphWindow.appendChild(obj[0]);
                this.graphWindow.removeChild(obj[1])
            }
            returnArrowStep.undoIt = (obj) => {
                this.graphWindow.removeChild(obj);
            }
            returnArrowStep.description = `fn(${node.input}) returns ${node.result}`;
            this.steps.push(returnArrowStep);
        } else {
            const returnNoArrow = {};
            returnNoArrow.doIt = () => {};
            returnNoArrow.undoIt = () => {};
            returnNoArrow.description = `fn(${node.input}) returns ${node.result}`;
            this.steps.push(returnNoArrow);
        }
    }

    addNavButtonListeners() { 
        this.navSteps.addClickEventListener('beginningButton', () => {
            this.skipToBeg = true
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
            this.skipToEnd = true
            this.currentStep = this.steps.length - 1
            this.jumpToStep(this.currentStep)
        })
    }

    jumpToStep(step) { 
        for (let i = 0; i <= step; i++) {
            let {doIt, obj, description} = this.steps[i];
            doIt(obj);
        }
        for (let i = this.steps.length-1; i > step; i--) {
            const {undoIt, obj} = this.steps[i];
            undoIt(obj);
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