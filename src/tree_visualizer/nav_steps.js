import { setAttributes } from "../utilities/util";

export default class NavSteps {
    constructor() {

        this.navSteps = document.createElement("div");
        this.navSteps.classList.add('nav-steps')

        const beginningButton = document.createElement("i")
        beginningButton.classList.add("fa-solid", "fa-backward", "fa-3x")
        setAttributes(beginningButton, {
            title: 'Skip to Beginning'
        })
        this.navSteps.appendChild(beginningButton);

        const previousStepButton = document.createElement("i")
        previousStepButton.classList.add("fa-solid", "fa-caret-left", "fa-3x")
        setAttributes(previousStepButton, {
            title: 'Go back a step'
        })
        this.navSteps.appendChild(previousStepButton);
        
        const runButton = document.createElement("button");
        runButton.innerHTML = "RUN"
        this.navSteps.appendChild(runButton)

        const nextStepButton = document.createElement("i");
        nextStepButton.classList.add("fa-solid", "fa-caret-right", "fa-3x");
        setAttributes(nextStepButton, {
            title: 'Go forward a step'
        })
        this.navSteps.appendChild(nextStepButton);

        const endButton = document.createElement("i");
        endButton.classList.add("fa-solid", "fa-forward", "fa-3x");
        setAttributes(endButton, {
            title: 'Skip to end'
        })
        this.navSteps.appendChild(endButton);

        this.buttons = {
            'beginningButton': beginningButton,
            'previousStepButton': previousStepButton, 
            'nextStepButton': nextStepButton,
            'endButton': endButton,
            'runButton': runButton
        }
    }


    getDOMObject() { 
        return this.navSteps;
    }

    addClickEventListener(button, cb) {
        button = this.buttons[button] // button is an element 
        button.addEventListener("click", cb)
    }
}