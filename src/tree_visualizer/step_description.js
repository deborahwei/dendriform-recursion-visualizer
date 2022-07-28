export default class StepDescription {
    constructor()  {

        this.description = '' 

        this.descriptionContainer = document.createElement("div")
        this.descriptionContainer.classList.add("step-description")
        
        this.descriptionText = document.createElement("p")
        this.descriptionText.innerHTML = this.description
    }

    updateDescription(description) {
        this.description = description 
    }

    getDOMObject() {
        return this.descriptionContainer
    }
}