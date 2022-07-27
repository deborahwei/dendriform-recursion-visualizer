import { setAttributes } from "../utilities/util"

export default class Instructions {
    constructor() {
        this.instructions = document.createElement('div')
        setAttributes(this.instructions, {
            id: 'instructions'
        })

        const instructionsContent = document.createElement('div')
        this.instructions.appendChild(instructionsContent)
        setAttributes(instructionsContent, {
            id: 'instructions-content'
        })

        const instructionsHeader = document.createElement('header')
        const instructionsTitle = document.createElement('h1')
        instructionsTitle.textContent = 'DENDRIFORM'
        instructionsHeader.appendChild(instructionsTitle)
        instructionsContent.appendChild(instructionsHeader)

        const exit = document.createElement("div")
        instructionsHeader.appendChild(exit)
        setAttributes(exit, {
            id: 'exit-instructions'
        })

        const x = document.createElement('div')
        x.innnerText = "✖"
        setAttributes(x, {
            id: 'x-instructions' 
        })
        exit.appendChild(x)

        const instructionsSubheading = document.createElement('h2')
        instructionsContent.appendChild(instructionsSubheading)

        const instructionsImages = document.createElement('div')
        instructionsContent.appendChild(instructionsImages)
        instructionsImages.classList.add('instructions-images')

        const instructionsTextContainer = document.createElement('div')
        instructionsContent.appendChild(instructionsTextContainer)
        instructionsTextContainer.classList.add('instructions-text')
        const instructionsText = document.createElement('p')
        instructionsTextContainer.append(instructionsText)

        const instructionsFooter = document.createElement('footer')
        instructionsContent.appendChild(instructionsFooter)

        const backButton = document.createElement('div')
        instructionsFooter.appendChild(backButton)
        const pageNumber = document.createElement('div')
        instructionsFooter.appendChild(pageNumber)
        const forwardButton = document.createElement('div')
        instructionsFooter.appendChild(forwardButton)
    }

    getDOMObject() { 
        return this.instructions
    }
}