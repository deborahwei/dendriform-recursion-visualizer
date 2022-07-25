import UserInput from "./user_input";

export default class ControllerContainer {
    constructor() {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("controller-container");
        
        this.userInputs = new UserInput() 
        this.mainContainer.appendChild(this.userInputs.getDOMObject())
    }

    getDOMObject() {
        return this.mainContainer;
    }
};