import NavBar from "./nav_bar";
import { setAttributes } from "../utilities/util";

export default class ControllerContainer {
    constructor() {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("controller-container");
        
        this.navBar = new NavBar()
        const navArea = this.navBar.getDOMObject()
        this.mainContainer.appendChild(navArea)

        this.question = document.createElement('div')
        setAttributes(this.question, {
            title: 'Help'
        })
        this.question.classList.add("help")
        this.mainContainer.appendChild(this.question)
        const questionMark = document.createElement('div')
        questionMark.innerText = "?"
        questionMark.classList.add('question-mark')
        this.question.appendChild(questionMark)
    }

    getDOMObject() {
        return this.mainContainer;
    }

    getHelp() {
        return this.question
    }

};