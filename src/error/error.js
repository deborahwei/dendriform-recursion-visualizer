export default class Error { 
    constructor(message) { 
        this.message = message
        
        this.modal = document.createElement('div')
        this.modal.classList.add('error-container')
        
        this.modalContent = document.createElement("div")
        this.modalContent.classList.add("modal-content")
        this.modal.appendChild(this.modalContent)
        
        this.errorHeader = document.createElement("h2")
        this.errorHeader.classList.add("error-header")
        this.errorHeader.textContent = "ERROR"
        this.modalContent.appendChild(this.errorHeader)
        
        this.errorMessage = document.createElement("p")
        this.errorMessage.classList.add("error-message")
        this.modalContent.appendChild(this.errorMessage)
        this.errorMessage.innerHTML = message
        
        this.close = document.createElement("div")
        this.errorHeader.appendChild(this.close)
        this.close.classList.add("close")

        this.x = document.createElement("div")
        this.x.innerText = "✖"
        this.x.classList.add("x")
        this.close.appendChild(this.x)

        this.closeError()
    }

    closeError() { 
        this.x.addEventListener('click', () => {
            this.modal.style.display = "none"
        });
    }

    getDOMObject() { 
        return this.modal
    }
}