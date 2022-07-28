import { setAttributes } from "../utilities/util";
import DefaultFunctions from "./default_functions";
import CodeFlask from "codeflask";

export default class UserInput {
    constructor() { 
        this.functionBody = `function fn() {\n//write your code here \n}`;
        this.defaultFunc = ''
        
        this.userInputs = document.createElement("div");
        this.userInputs.classList.add("user-inputs")
        
        this.lastValidFirstLine = ''
        
        this.defaultFunctions = new DefaultFunctions()
        this.defaultDiv = this.defaultFunctions.getDOMObject()

        this.selectedButton = this.defaultFunctions.buttons['customButton']

        this.createTextArea() 
        this.addFunctionButtonEventListeners()
        this.createParams()
    }
    
    getdefaultFunction() {
        return this.defaultDiv
    }

    selectFunction(functionName) {
        this.selectedButton?.classList.remove("selected")
        const button = this.defaultFunctions.buttons[functionName]
        button.classList.add('selected')
        this.selectedButton = button
    }

    eventCallback(buttonName) {
        this.defaultFunc = this.defaultFunctions.getFunction(buttonName)
        this.fBFlask.updateCode(this.defaultFunc.functionBody)
        this.userParams.textContent = this.defaultFunc.params
    }
    
    addFunctionButtonEventListeners() { 
        this.defaultFunctions.addClickEventListener('customButton', () => { 
            this.selectFunction("customButton")
            this.eventCallback('Custom')
        })
        
        this.defaultFunctions.addClickEventListener('fibButton', () => { 
            this.selectFunction("fibButton")
            this.eventCallback('Fibonacci Sum')
        })
        
        this.defaultFunctions.addClickEventListener('binomialButton', () => { 
            this.selectFunction("binomialButton")
            this.eventCallback('Binomial Coefficient')
        })

        this.defaultFunctions.addClickEventListener('coinButton', () => {
            this.selectFunction("coinButton")
            this.eventCallback('Coin Change')
        })

        this.defaultFunctions.addClickEventListener('sumDigitsButton', () => {
            this.selectFunction("sumDigitsButton")
            this.eventCallback('Sum of Digits')
        })

        this.defaultFunctions.addClickEventListener('subsequenceButton', () => {
            this.selectFunction("subsequenceButton")
            this.eventCallback('Longest Common Subsequence')
        })
    }

    createTextArea() { 
        const codeFlaskWrapper =  document.createElement('div')
        this.userInputs.appendChild(codeFlaskWrapper)
        setAttributes(codeFlaskWrapper, {
            'id': 'flask-wrapper'
        })

        this.fBFlask = new CodeFlask(codeFlaskWrapper, {
            language: 'js', 
            lineNumbers: true, 
            defaultTheme: false
        })
        
        this.fBFlask.updateCode(this.functionBody)
        this.lastValidFirstLine = 'function fn() {'
        
        this.fBFlask.onUpdate((code) => {
            const lines = code.split('\n')
            if (lines[0].slice(0, 12) !== 'function fn(' || lines[0].slice(lines[0].length - 3) !== ') {') {
                lines[0] =  this.lastValidFirstLine
                this.fBFlask.updateCode(lines.join('\n'))
            }
            else { 
                this.lastValidFirstLine = lines[0]
            }
        })

    }

    createParams() {
        const paramsWrapper = document.createElement('div')
        this.userInputs.appendChild(paramsWrapper)

        const fn = document.createElement('div')
        fn.textContent = "fn("
        paramsWrapper.append(fn)
        
        this.userParams = document.createElement('span')
        setAttributes(this.userParams, {
            "contenteditable": true,
            "role": "textbox"
        })
    
        paramsWrapper.append(this.userParams)
        
        const endParenthesis = document.createElement('div')
        endParenthesis.textContent = ")"
        paramsWrapper.append(endParenthesis)
        
        setAttributes(paramsWrapper, {
            'id': 'params-wrapper'
        })
    }

    getFunctionBody() { 
        const code = this.fBFlask.getCode().split('\n')
        this.functionBody = code.slice(1).join('\n')
        return this.functionBody
    }

    getParams() { 
        return this.userParams.textContent.split(',')
    }

    getArgs() { // gets ahold of what is between the parenthesis 
        return this.lastValidFirstLine.split()[0].slice(0, this.lastValidFirstLine.length -3).slice(12).split(',')
    }

    getDOMObject() { 
        return this.userInputs
    }

}