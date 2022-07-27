import { setAttributes } from "../utilities/util"

export default class Instructions {
    constructor() {
        this.subheadings = [
        "Pick a recursive function to visualize", 
        "Edit or use default params and arguments",
        "Click run",
        "Navigate through the tree"
        ]

        this.texts = [
        "Welcome to Dendriform: a recursion visualizer that displays the recursive function calls in a tree. You can select one of the default functions or input one of your own. When inputting your own recursive function you can also add in helper functions or global variables.",
        "Default functions will display default code and default parameters, which can be edited. You can choose to visualize the function with the default parameters or write in your own within the parenthesis. If you are inputting your custom function, you must add the parameters and arguments for your function.",
        "Click the run button for the tree to start drawing. You can click the fast forward button to skip to the fully drawn tree.",
        "You can click through the navigational buttons to see different branches of the recursive tree. The outer buttons skip to the beginning or the end of the tree. The inner buttons allow you to iterate throguh each individual step."
        ]

        this.gifs = {
            'page1': {'gif1': 'assets/gifs/pg1selecting.gif', 'gif2': 'assets/gifs/pg1addingconstants.gif'}
        }

        this.instructions = document.createElement('div')
        this.instructions.classList.add('instructions')

        this.instructionsContent = document.createElement('div')
        this.instructions.appendChild(this.instructionsContent)
        this.instructionsContent.classList.add('instructions-content')

        const instructionsHeader = document.createElement('header')
        this.instructionsTitle = document.createElement('h1')
        this.instructionsTitle.textContent = 'DENDRIFORM'
        instructionsHeader.appendChild(this.instructionsTitle)
        this.instructionsContent.appendChild(instructionsHeader)

        const exit = document.createElement("div")
        instructionsHeader.appendChild(exit)
        setAttributes(exit, {
            id: 'exit-instructions'
        })

        this.x = document.createElement('div')
        this.x.innerText = "✖"
        exit.appendChild(this.x)
        setAttributes(this.x, {
            id: 'x-instructions' 
        })
        
        this.closeInstructions()

        this.subheadingContainer = document.createElement('div')
        this.instructionsContent.appendChild(this.subheadingContainer)
        this.subheadingContainer.classList.add("subheading")

        this.instructionsSubheading = document.createElement('h2')
        this.instructionsSubheading.innerHTML = this.subheadings[0]
        this.subheadingContainer.appendChild(this.instructionsSubheading)

        this.instructionsImages = document.createElement('div')
        this.instructionsContent.appendChild(this.instructionsImages)
        this.instructionsImages.classList.add('instructions-images')

        this.gifOne = document.createElement('img')
        this.gifOne.src = this.gifs['page1'].gif1
        this.instructionsImages.appendChild(this.gifOne)
        this.gifOne.classList.add('gif')
        
        this.gifTwo = document.createElement('img')
        this.gifTwo.src = this.gifs['page1'].gif2
        this.instructionsImages.appendChild(this.gifTwo)
        this.gifTwo.classList.add('gif')

        this.instructionsTextContainer = document.createElement('div')
        this.instructionsContent.appendChild(this.instructionsTextContainer)
        this.instructionsTextContainer.classList.add('instructions-text')
        
        this.instructionsText = document.createElement('p')
        this.instructionsText.innerHTML = this.texts[0]
        this.instructionsTextContainer.append(this.instructionsText)

        const instructionsFooter = document.createElement('footer')
        this.instructionsContent.appendChild(instructionsFooter)

        this.backButton = document.createElement('i')
        instructionsFooter.appendChild(this.backButton)
        this.backButton.classList.add("fa-solid", "fa-chevron-left", "fa-2xl")
        
        this.pageNumber = document.createElement('div')
        instructionsFooter.appendChild(this.pageNumber)

        this.forwardButton = document.createElement('i')
        instructionsFooter.appendChild(this.forwardButton)
        this.forwardButton.classList.add("fa-solid", "fa-chevron-right", "fa-2xl")

    }

    getDOMObject() { 
        return this.instructions
    }

    closeInstructions() { 
        this.x.addEventListener('click', () => {
            console.log('hide')
            this.hide()  
        })
    }

    show() {
        this.instructions.classList.remove('hide-instructions')
        this.instructions.classList.add('instructions')
    }

    hide() {
        this.instructions.classList.remove('instructions')
        this.instructions.classList.add('hide-instructions')
    }

    hideArrow(isBack) { 
        if (isBack) this.backButton.classList.add("hide-instructions")
        else this.forwardButton.classList.add("hide-instructions")
    }
    
    showArrow(isBack) { 
        if (isBack) this.backButton.classList.remove("hide-instructions")
        else this.forwardButton.classList.remove("hide-instructions")
    }

    changeSlide(pageNumber) { 
        this.subheading.innerHTML = this.subheadings[pageNumber]
        this.text = this.texts[pageNumber]
    }
}