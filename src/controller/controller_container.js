import DefaultFunctions from "./default_functions";
import NavBar from "./nav_bar";

export default class ControllerContainer {
    constructor() {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("controller-container");
        
        this.navBar = new NavBar()
        const navArea = this.navBar.getDOMObject()
        this.mainContainer.appendChild(navArea)

        this.defaultFunctions = new DefaultFunctions()
        const defaultDiv = this.defaultFunctions.getDOMObject()
        this.mainContainer.appendChild(defaultDiv)
    }

    getDOMObject() {
        return this.mainContainer;
    }
};