export default class DefaultFunctions {
    constructor() { 
        this.functionLibrary = {
            'Custom': {
                'arg':'',
                'functionBody': '// write your code here'
            },
            'Fibonacci Sum': {
                'arg': 'n',
                'functionBody': `
                if (n == 0 || n == 1)
                return n
                return fn(n-1) + fn(n-2)
                `
            },
            'Binomial Coefficient': {
                'arg': 'n, k',
                'functionBody': `
                if (k == 0 || n == k)
                return 1
                return fn(n-1, k-1) + fn(n-1, k)
                `
            }
        }

        this.defaultDiv = document.createElement("div")
        this.defaultDiv.classList.add('default-funcs')

        const customButton = document.createElement("button")
        customButton.innerHTML = "Custom Function"
        
        const fibButton = document.createElement("button")
        fibButton.innerHTML = "Fibonacci Sum"
        
        const binomialButton = document.createElement("button")
        binomialButton.innerHTML = "Binomial Coefficient"

        this.defaultDiv.appendChild(customButton)
        this.defaultDiv.appendChild(fibButton)
        this.defaultDiv.appendChild(binomialButton)
        
        this.buttons = {
            'customButton': customButton,
            'fibButton': fibButton, 
            'binomialButton': binomialButton,
        }
    }

    addClickEventListener(b, cb) {
        const button = this.buttons[b]
        button.addEventListener("click", cb)
    }

    getDOMObject() { 
        return this.defaultDiv 
    }

    getFunction(functionName) { 
        return this.functionLibrary[functionName]
    }
}