import { setAttributes } from "../utilities/util"

export default class Instructions {
    constructor() {

        this.currentPage = 0

        this.subheadings = [
        "Pick a recursive function to visualize", 
        "Edit or use default params and arguments",
        "Click run",
        "Navigate through the tree"
        ]

        this.texts = [
        "Welcome to Dendriform: a recursion visualizer that displays the recursive function calls in a tree. You can select one of the default functions or input one of your own. When inputting your own recursive function you can also add in helper functions or global variables.",
        "Default functions will display default code and default parameters, which can be edited. You can choose to visualize the function with the default parameters or write in your own within the parenthesis. If you are inputting your custom function, you must add the parameters and arguments for your function.",
        "Click the run button for the tree to start drawing. You can click the fast forward button to skip to the fully drawn tree. You can also skip back to the beginning if you want to iterate through the steps yourself. Clicking forward and backwards will cause the tree to stop rendering on that respective step",
        "You can click through the navigational buttons to see different branches of the recursive tree. The outer buttons skip to the beginning or the end of the tree. The inner buttons allow you to iterate through each individual step."
        ]

        this.gifs = {
            'page0': {'gif1': 'assets/gifs/1a.gif', 'gif2': 'assets/gifs/1b.gif'},
            'page1': {'gif1': 'assets/gifs/2a.gif', 'gif2': 'assets/gifs/2b.gif'},
            'page2': {'gif1': 'assets/gifs/3a.gif'},
            'page3': {'gif1': 'assets/gifs/4a.gif'}
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
            id: 'exit-instructions',
            title: 'Close'
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
        this.instructionsImages.appendChild(this.gifOne)
        
        this.gifTwo = document.createElement('img')
        this.instructionsImages.appendChild(this.gifTwo)

        this.instructionsTextContainer = document.createElement('div')
        this.instructionsContent.appendChild(this.instructionsTextContainer)
        this.instructionsTextContainer.classList.add('instructions-text')
        
        this.instructionsText = document.createElement('p')
        this.instructionsTextContainer.append(this.instructionsText)
        setAttributes(this.instructionsText, {
            id: 'instructions-p'
        })
        
        const instructionsFooter = document.createElement('footer')
        this.instructionsContent.appendChild(instructionsFooter)

        this.backButton = document.createElement('i')
        this.backButton.classList.add("fa-solid", "fa-chevron-left", "fa-2xl")
        setAttributes(this.backButton, {
            title: 'Previous step'
        })
        instructionsFooter.appendChild(this.backButton)
        
        this.pageNumber = document.createElement('div')
        instructionsFooter.appendChild(this.pageNumber)

        this.forwardButton = document.createElement('i')
        instructionsFooter.appendChild(this.forwardButton)
        setAttributes(this.forwardButton, {
            title: 'Next step'
        })
        this.forwardButton.classList.add("fa-solid", "fa-chevron-right", "fa-2xl")

        this.reset()
        this.switchPage()


    }

    getDOMObject() { 
        return this.instructions
    }

    closeInstructions() { 
        this.x.addEventListener('click', () => {
            this.hide()  
        })
    }

    switchPage() {
        this.forwardButton.addEventListener('click', () => {
            this.currentPage += 1
            this.pageSetup()
            switch(this.currentPage) {
                case 0: 
                    this.gifTwo.src = this.gifs[`page${this.currentPage}`].gif2
                    break;
                case 1: 
                    this.backButton.classList.remove('hidden')
                    this.gifTwo.classList.remove('hide')
                    this.gifTwo.src = this.gifs[`page${this.currentPage}`].gif2
                    break;
                case 2:
                    this.backButton.classList.remove('hidden')
                    this.forwardButton.classList.remove('hidden')
                    this.gifTwo.classList.add('hide')
                    break;
                case 3: 
                    this.forwardButton.classList.add('hidden')
                    this.gifOne.classList.add('slide-four')
                    break;
            }    
            this.pageNumber.textContent = `${this.currentPage + 1} /4`
        })
        this.backButton.addEventListener('click', () => {
            this.currentPage -= 1
            this.pageSetup()
            switch(this.currentPage) {
                case 0: 
                    this.backButton.classList.add('hidden')
                    this.gifTwo.classList.remove('hide')
                    this.gifTwo.src = this.gifs[`page${this.currentPage}`].gif2
                    break;
                case 1: 
                    this.backButton.classList.remove('hidden')
                    this.gifTwo.classList.remove('hide')
                    this.gifTwo.src = this.gifs[`page${this.currentPage}`].gif2
                    break;
                case 2:
                    this.backButton.classList.remove('hidden')
                    this.forwardButton.classList.remove('hidden')
                    this.gifTwo.classList.add('hide')
                    this.gifOne.classList.remove('slide-four')
                    break;
                case 3: 
                    break;

            }    
            this.pageNumber.textContent = `${this.currentPage + 1}/4`
        })
    }

    pageSetup() {
        this.instructionsSubheading.innerHTML = this.subheadings[this.currentPage]
        this.instructionsText.innerHTML = this.texts[this.currentPage]
        this.gifOne.src = this.gifs[`page${this.currentPage}`].gif1
    }

    show() {
        this.instructions.classList.remove('hide')
        this.instructions.classList.add('instructions')
    }

    hide() {
        this.instructions.classList.remove('instructions')
        this.instructions.classList.add('hide')
    }

    reset() { 
        this.currentPage = 0
        this.gifOne.src = this.gifs['page0'].gif1
        this.gifTwo.src = this.gifs['page0'].gif2
        this.instructionsText.innerHTML = this.texts[0]
        this.backButton.classList.add("hidden")
        this.forwardButton.classList.remove("hidden")
        this.pageNumber.textContent = `${this.currentPage + 1}/4`
    }

    addQuestionButton(button) {
        button.addEventListener("click", () => {
            this.reset()
            this.show()
        })
    }
}