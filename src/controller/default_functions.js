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
            'Exponent Base': {
                'arg': 'b, e',
                'functionBody': `  if (e == 0)\n    return 1\n  else\n  return b * fn(b, e - 1)`,
                'params': '3, 5'
            },
            'Sum of Digits': {
                'arg': 'n',
                'functionBody': `  if (n < 10)\n    return n\n  const lastDigit = n % 10\n  const remainingNum = Math.floor(n / 10)\n  return fn(lastDigit + fn(remainingNum))`,
                'params': '123'
            },
            'Temp Function': {
                'arg': 'n',
                'functionBody': `    if (n < 10)\n    return n\n  const lastDigit = n % 10\n  const remainingNum = Math.floor(n / 10)\n   return fn(lastDigit + fn(remainingNum))`,
                'params': '123'
            }
        }

        this.defaultDiv = document.createElement("div")
        this.defaultDiv.classList.add('default-funcs')

        this.leftColumn = document.createElement('div')
        this.leftColumn.classList.add('default-left')
        this.defaultDiv.appendChild(this.leftColumn)
        
        this.rightColumn = document.createElement('div')
        this.rightColumn.classList.add('default-right')
        this.defaultDiv.appendChild(this.rightColumn)
        
        const customButton = document.createElement("button")
        customButton.innerHTML = "CUSTOM FUNCTION"
        customButton.classList.add('custom-function')
        
        const fibButton = document.createElement("button")
        fibButton.innerHTML = "FIBONACCI SUM"
        
        const binomialButton = document.createElement("button")
        binomialButton.innerHTML = "BINOMIAL COEFFICIENT"

        const exponentialButton = document.createElement("button")
        exponentialButton.innerHTML = "EXPONENT BASE"
        
        const sumDigitsButton = document.createElement("button")
        sumDigitsButton.innerHTML = "SUM OF DIGITS"
        
        const tempButton = document.createElement("button")
        tempButton.innerHTML = "TEMP"

        this.leftColumn.appendChild(customButton)
        this.leftColumn.appendChild(fibButton)
        this.leftColumn.appendChild(binomialButton)
        this.rightColumn.appendChild(exponentialButton)
        this.rightColumn.appendChild(sumDigitsButton)
        this.rightColumn.appendChild(tempButton)
        
        this.buttons = {
            'customButton': customButton,
            'fibButton': fibButton, 
            'binomialButton': binomialButton,
            'exponentialButton': exponentialButton,
            'sumDigitsButton': sumDigitsButton,
            'tempButton': tempButton
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