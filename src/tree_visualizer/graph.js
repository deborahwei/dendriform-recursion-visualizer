import { setAttributes, svgNameSpace, sleep} from "../utilities/util";
import Arrow from "./arrow";
import { NODE_SLEEP_MS, ARROW_SLEEP_TIME } from "./constants";
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

        this.steps = []
        this.currentStep = -1;
        this.animating = false;
        this.currentAnimation = new Promise(res => res());
    };

    reset() {
        return this.jumpToStep(-1).then(() => {
            this.animating = false;
            this.graphWindow.innerHTML = ''
    
            this.steps = []
            this.currentStep = -1;
        })
    }

    animate() {
        if (this.animating) return;
        this.animating = true;
        this.currentAnimation = this.startAnimation();
    }

    startAnimation() {
        return new Promise(async res => {
            for (const step of this.steps) {
                if (!this.animating) break;
                const {doIt, description, obj, sleepTime} = step;
                await sleep(doIt, sleepTime, obj, true);
                // doIt(obj);
                this.currentStep++;
            }
            this.animating = false;
            res();
        })
    }
// doIt: add dom elements to document w/ or w/o animation
// undoIt: remove dom elements from document
// obj: obj to act on
// description: describe step
// sleep_time: ms to wait

    generateSteps(node, parent = null, callArrow = null) { 
        const initialStep = {};
        initialStep.doIt = (obj) => {
            obj.classList.remove("completed")
            obj.classList.add("processing");
            this.graphWindow.appendChild(obj);
        }
        initialStep.description = `fn(${node.input}) is called`;
        initialStep.obj = node.getDOMObject();
        initialStep.undoIt = (obj) => {
            if (obj.parentElement === this.graphWindow)
                this.graphWindow.removeChild(obj);
        };
        initialStep.sleepTime = NODE_SLEEP_MS;
        this.steps.push(initialStep);

        for (const child of node.children) {
            const callArrowStep = {};
            const arrow = new Arrow(child.id, child.result, [node.x, node.y], [child.x, child.y], false);
            callArrowStep.obj = [arrow.getDOMObject(), arrow];
            callArrowStep.doIt = (obj, shouldAnimate) => {
                this.graphWindow.appendChild(obj[0]);
                if (shouldAnimate)
                    obj[1].addAnimateTag();
            }
            callArrowStep.description = `fn(${node.input}) calls fn(${child.input})`;
            callArrowStep.undoIt = (obj) => {
                obj[1].stopAnimate();
                if (obj[0].parentElement === this.graphWindow)
                    this.graphWindow.removeChild(obj[0]);
            }
            callArrowStep.sleepTime = ARROW_SLEEP_TIME;
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
        finishedRunningStep.sleepTime = NODE_SLEEP_MS;
        this.steps.push(finishedRunningStep);

        if (parent !== null) {
            const arrow = new Arrow(node.id, node.result,[parent.x, parent.y],[node.x, node.y], true);
            const returnArrowStep = {};
            returnArrowStep.obj = [arrow.getDOMObject(), callArrow, arrow];
            returnArrowStep.doIt = (obj, shouldAnimate) => {
                this.graphWindow.appendChild(obj[0]);
                if (shouldAnimate)
                    obj[2].addAnimateTag();
                if (obj[1].parentElement === this.graphWindow)
                    this.graphWindow.removeChild(obj[1]);
            }
            returnArrowStep.undoIt = (obj) => {
                obj[2].stopAnimate();
                if (obj[0].parentElement === this.graphWindow)
                    this.graphWindow.removeChild(obj[0]);
            }
            returnArrowStep.description = `fn(${node.input}) returns ${node.result}`;
            returnArrowStep.sleepTime = ARROW_SLEEP_TIME;
            this.steps.push(returnArrowStep);
        } else {
            const returnNoArrow = {};
            returnNoArrow.doIt = () => {};
            returnNoArrow.undoIt = () => {};
            returnNoArrow.description = `fn(${node.input}) returns ${node.result}`;
            returnNoArrow.sleepTime = 0;
            this.steps.push(returnNoArrow);
        }
    }

    addNavButtonListeners() { 
        this.navSteps.addClickEventListener('beginningButton', () => {
            this.skipToBeg = true
            this.jumpToStep(0);
        })
        this.navSteps.addClickEventListener('previousStepButton', () => {
            if (this.currentStep - 1 >= 0)
                this.jumpToStep(this.currentStep-1);
        })
        this.navSteps.addClickEventListener('nextStepButton', () => {
            if (this.currentStep + 1 < this.steps.length)
                this.jumpToStep(this.currentStep+1);
        })
        this.navSteps.addClickEventListener('endButton', () => {
            this.skipToEnd = true
            this.jumpToStep(this.steps.length - 1)
        })
    }

    jumpToStep(step) {
        this.animating = false;
        return this.currentAnimation.then(() => {
                this.animating = false;
                this.graphWindow.innerHTML = "";
                for (let i = this.steps.length-1; i >= 0; i--) {
                    let {undoIt, obj} = this.steps[i];
                    undoIt(obj);
                }
                for (let i = 0; i <= step; i++) {
                    let {doIt, obj, description} = this.steps[i];
                    doIt(obj, false);
                }
                this.currentStep = step;
            }
        )
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