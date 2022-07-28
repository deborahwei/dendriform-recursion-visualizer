export default class Error { 
    constructor() { 
        this.message = ''
        
        this.modal = document.createElement('div')
        this.modal.classList.add('error-container')
        
        this.modalContent = document.createElement("div")
        this.modal.appendChild(this.modalContent)

        this.hide()
        
        this.errorHeader = document.createElement("h2")
        this.errorHeader.classList.add("error-header")
        this.errorHeader.textContent = "ERROR"
        this.modalContent.appendChild(this.errorHeader)
        
        this.errorMessage = document.createElement("p")
        this.errorMessage.classList.add("error-message")
        this.modalContent.appendChild(this.errorMessage)
        this.errorMessage.innerHTML = this.message
        
        this.close = document.createElement("div")
        this.errorHeader.appendChild(this.close)
        this.close.classList.add("close")

        this.x = document.createElement("div")
        this.x.innerText = "✖"
        this.x.classList.add("x")
        this.close.appendChild(this.x)

        this.closeError()
    }

    updateMessage(message) { 
        this.message = message
        this.errorMessage.innerHTML = message
    }

    closeError() { 
        this.x.addEventListener('click', () => {
            this.hide()
        });
    }

    getDOMObject() { 
        return this.modal
    }

    show() {
        this.modal.classList.remove('hide')
        this.modalContent.classList.add("modal-content")
    }
    
    hide() { 
        this.modalContent.classList.remove("modal-content")
        this.modal.classList.add('hide')
    }
}