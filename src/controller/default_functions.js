const fibBody =
`function fn(n) {
  if (n == 0 || n == 1)
    return n
  return fn(n-1) + fn(n-2)
}`;

const customBody = 
`function fn() {
  // write your code here
}`

const binomialBody = 
`function fn(n, k) {
  if (k == 0 || n == k)
    return 1
 return fn(n-1, k-1) + fn(n-1, k)
}`

const coinBody = 
`function fn(v) {
  if (v == 0) return 0
  if (v < 0) return Infinity
  let ans = Infinity
  for (const coin of coins)
    ans = Math.min(ans, 1 +fn(v- coin))
  return ans
}
  const coins = [1, 3, 4, 5]
`

const sumBody = 
`function fn(n) {
  if (n < 10)
    return n
  const lastDigit = n % 10
  const remainingNum = Math.floor(n / 10)
  return fn(lastDigit + fn(remainingNum))
}
`

const sequenceBody = 
`function fn(i, j) {
  if (i == a.length || j == b.length)
    return 0
  if (a[i] == b[j])
    return 1+fn(i+1, j+1)
  return Math.max(fn(i+1, j), fn(i, j+1))
}
const a = "DEBO"
const b = "EBWDO"\n
`

export default class DefaultFunctions {
    constructor() { 
        this.functionLibrary = {
            'Custom': {
                'functionBody': customBody,
                'params': ''
            },
            'Fibonacci Sum': {
                'functionBody': fibBody,
                'params': '5'
            },
            'Binomial Coefficient': {
                'functionBody': binomialBody,
                'params': '5, 2'
            }, 
            'Coin Change': {
                'functionBody': coinBody,
                'params': '4'
            },
            'Sum of Digits': {
                'functionBody': sumBody,
                'params': '123'
            },
            'Longest Common Subsequence': {
                'functionBody': sequenceBody,
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


