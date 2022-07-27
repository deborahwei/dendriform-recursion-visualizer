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
            'Coin Change': {
                'arg': 'v',
                'functionBody': `  const coins = [1, 3, 4, 5]\n  if (v == 0) return 0\n  if (v < 0) return Infinity\n  let ans = Infinity\n  for (const coin of coins)\n  ans = Math.min(ans, 1 +fn(v- coin))\n  return ans`,
                'params': '4'
            },
            'Sum of Digits': {
                'arg': 'n',
                'functionBody': `  if (n < 10)\n    return n\n  const lastDigit = n % 10\n  const remainingNum = Math.floor(n / 10)\n  return fn(lastDigit + fn(remainingNum))`,
                'params': '123'
            },
            'Longest Common Subsequence': {
                'arg': 'i, j',
                'functionBody': `  const a = "DEBO"\n  const b = "EBWDO"\n  if (i == a.length || j == b.length)\n  return 0\n  if (a[i] == b[j])\n    return 1+fn(i+1, j+1)\n  return Math.max(fn(i+1, j), fn(i, j+1))`,
                'params': '1, 1'
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
        customButton.classList.add('selected')
        
        const fibButton = document.createElement("button")
        fibButton.innerHTML = "FIBONACCI SUM"
        
        const binomialButton = document.createElement("button")
        binomialButton.innerHTML = "BINOMIAL COEFFICIENT"

        const coinButton = document.createElement("button")
        coinButton.innerHTML = "COIN CHANGE"
        
        const sumDigitsButton = document.createElement("button")
        sumDigitsButton.innerHTML = "SUM OF DIGITS"
        
        const subsequenceButton = document.createElement("button")
        subsequenceButton.innerHTML = "LONGEST COMMON SUBSEQUENCE"

        this.leftColumn.appendChild(customButton)
        this.leftColumn.appendChild(fibButton)
        this.leftColumn.appendChild(binomialButton)
        this.rightColumn.appendChild(coinButton)
        this.rightColumn.appendChild(sumDigitsButton)
        this.rightColumn.appendChild(subsequenceButton)
        
        this.buttons = {
            'customButton': customButton,
            'fibButton': fibButton, 
            'binomialButton': binomialButton,
            'coinButton': coinButton,
            'sumDigitsButton': sumDigitsButton,
            'subsequenceButton': subsequenceButton
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