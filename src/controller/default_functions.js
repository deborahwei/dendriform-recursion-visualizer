export default class DefaultFunctions {
    constructor() { 
        this.functionLibrary = {
            'Custom': {
                'arg':'',
                'functionBody': '// write your code here',
                'params': ""
            },
            'Fibonacci Sum': {
                'arg': 'n',
                'functionBody': `  if (n == 0 || n == 1)\n    return n\n  return fn(n-1) + fn(n-2)`,
                'params': '5'
            },
            'Binomial Coefficient': {
                'arg': 'n, k',
                'functionBody': `  if (k == 0 || n == k)\n    return 1\n  return fn(n-1, k-1) + fn(n-1, k)`,
                'params': '5, 2'
            }, 
            'Exponential': {
                'arg': 'n, k',
                'functionBody': `  if (k == 0 || n == k)\n  return 1\n  return fn(n-1, k-1) + fn(n-1, k)`,
                'params': '3, 5'
            }
        }

        this.defaultDiv = document.createElement("div")
        this.defaultDiv.classList.add('default-funcs')

        const customButton = document.createElement("button")
        customButton.innerHTML = "CUSTOM FUNCTION"
        
        const fibButton = document.createElement("button")
        fibButton.innerHTML = "FIBONACCI SUM"
        
        const binomialButton = document.createElement("button")
        binomialButton.innerHTML = "BINOMIAL COEFFICIENT"

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