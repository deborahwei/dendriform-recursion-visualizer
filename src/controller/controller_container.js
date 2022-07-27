import NavBar from "./nav_bar";

export default class ControllerContainer {
    constructor() {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("controller-container");
        
        this.navBar = new NavBar()
        const navArea = this.navBar.getDOMObject()
        this.mainContainer.appendChild(navArea)
    }

    getDOMObject() {
        return this.mainContainer;
    }

    getNavBar() {
        return this.navBar
    }
};