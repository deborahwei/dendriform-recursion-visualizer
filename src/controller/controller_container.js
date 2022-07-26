import UserInput from "./user_input";

export default class ControllerContainer {
    constructor() {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("controller-container");
        
    }

    getDOMObject() {
        return this.mainContainer;
    }
};