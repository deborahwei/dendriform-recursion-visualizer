export default class StepDescription {
    constructor()  {

        this.descriptionContainer = document.createElement("div")
        this.descriptionContainer.classList.add("step-description")
        
        this.descriptionText = document.createElement("p")
        this.descriptionText.innerHTML = '';
        this.descriptionContainer.appendChild(this.descriptionText)
    }

    updateDescription(description) {
        this.descriptionText.innerHTML = description 
    }

    getDOMObject() {
        return this.descriptionContainer
    }
}