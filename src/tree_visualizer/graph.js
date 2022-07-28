import { setAttributes, svgNameSpace, sleep} from "../utilities/util";
import Arrow from "./arrow";
import { SLEEP_TIME } from "./constants";
import NavSteps from "./nav_steps";
import StepDescription from "./step_description";

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

        this.stepDescription = new StepDescription
        this.graphContainer.append(this.stepDescription.getDOMObject())
    };

    reset() {
        return this.jumpToStep(-1).then(() => {
            this.steps = [];
        })
    }

    animate() {
        if (this.animating) return;
        this.animating = true;
        this.currentAnimation = this.startAnimation();
    }

    startAnimation() {
        return new Promise(async res => {
            for (let i = 0; i < this.steps.length; i++) {
                if (!this.animating) break;
                const step = this.steps[i];
                const {doIt, description, obj} = step;
                this.stepDescription.updateDescription(description)
                await sleep(doIt, i == 0 ? 0 : SLEEP_TIME, obj, true);
                this.currentStep++;
            }
            this.animating = false;
            res();
        })
    }
// doIt: add dom elements to document w/ or w/o animation
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

        this.steps.push(initialStep);

        for (const child of node.children) {
            const callArrowStep = {};
            const arrow = new Arrow(child.id, child.result, [node.x, node.y], [child.x, child.y], false);
            callArrowStep.obj = arrow;
            callArrowStep.doIt = (obj, shouldAnimate) => {
                this.graphWindow.appendChild(obj.getDOMObject());
                if (shouldAnimate) obj.addAnimateTag();
            }
            callArrowStep.description = `fn(${node.input}) calls fn(${child.input})`;
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
        this.steps.push(finishedRunningStep);

        if (parent !== null) {
            const arrow = new Arrow(node.id, node.result,[parent.x, parent.y],[node.x, node.y], true);
            const returnArrowStep = {};
            returnArrowStep.obj = [arrow, callArrow];
            returnArrowStep.doIt = (obj, shouldAnimate) => {
                this.graphWindow.appendChild(obj[0].getDOMObject());
                if (shouldAnimate)
                    obj[0].addAnimateTag();
                if (obj[1].parentElement === this.graphWindow)
                    this.graphWindow.removeChild(obj[1]);
            }
            returnArrowStep.description = `fn(${node.input}) returns ${node.result}`;
            this.steps.push(returnArrowStep);
        } else {
            const returnNoArrow = {};
            returnNoArrow.doIt = () => {};
            returnNoArrow.description = `fn(${node.input}) returns ${node.result}`;
            this.steps.push(returnNoArrow);
        }
    }

    addNavButtonListeners() { 
        this.navSteps.addClickEventListener('beginningButton', () => {
            this.jumpToStep(0);
        })
        this.navSteps.addClickEventListener('previousStepButton', () => {
            if (this.currentStep - 1 >= 0)
                this.jumpToStep(this.currentStep - 1);
        })
        this.navSteps.addClickEventListener('nextStepButton', () => {
            if (this.currentStep + 1 < this.steps.length)
                this.jumpToStep(this.currentStep + 1);
        })
        this.navSteps.addClickEventListener('endButton', () => {
            this.jumpToStep(this.steps.length - 1)
        })
    }

    jumpToStep(step) {
        this.animating = false;
        return this.currentAnimation.then(() => {
                this.graphWindow.innerHTML = "";

                for (let i = 0; i <= step; i++) {
                    let {doIt, obj, description} = this.steps[i];
                    this.stepDescription.updateDescription(description)
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