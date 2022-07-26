import { setAttributes } from "../utilities/util";
import CodeFlask from "codeflask";

export default class UserInput {
    constructor() { 
        const fibFn = `
        if (n == 0 || n == 1)
        return n
    
        return fn(n-1) + fn(n-2)
        `

        this.userInputs = document.createElement("div");
        this.userInputs.classList.add("user-inputs")
        this.lastValidFirstLine = ''
        this.createTextArea()

        this.paramsInput = document.createElement("input");
        this.paramsLabel = document.createElement("label");
        this.paramsLabel.innerHTML = "Params: ";
        setAttributes(this.paramsInput, {
            'type': 'text', 
            'id': 'params-input', 
        })
        setAttributes(this.paramsLabel, {
            'for': 'params-input'
        })

        
        this.userInputs.appendChild(this.paramsLabel)
        this.userInputs.appendChild(this.paramsInput)
        
        this.runButton = document.createElement("button");
        this.runButton.innerHTML = "RUN"
        this.userInputs.appendChild(this.runButton)

        this.functionBody = 0;
        this.params = 0;

    }

    createTextArea() { 
        const codeFlaskWrapper =  document.createElement('div')
        this.userInputs.appendChild(codeFlaskWrapper)
        setAttributes(codeFlaskWrapper, {
            'id': 'flask-wrapper'
        })
        const flask = new CodeFlask(codeFlaskWrapper, {
            language: 'js', 
            lineNumbers: true
        })
        flask.updateCode('function fn() {\n // write code here \n}')
        this.lastValidFirstLine = 'function fn() {'
        
        flask.onUpdate((code) => {
            const lines = code.split('\n')
            console.log(lines[0].slice(0, 12), lines[0].slice(lines[0].length - 3))
            console.log(lines[0].slice(0, 12) !== 'function fn(', lines[0].slice(lines[0].length - 3) !== ') {')
            if (lines[0].slice(0, 12) !== 'function fn(' || lines[0].slice(lines[0].length - 3) !== ') {') {
                console.log(this.lastValidFirstLine)
                lines[0] =  this.lastValidFirstLine
                flask.updateCode(lines.join('\n'))
            }
            else { 
                this.lastValidFirstLine = lines[0]
            }
        })
    }
    
    addClickEventListener(cb) {
        this.runButton.addEventListener("click", cb)
    }

    getFunctionBody() {
        return this.functionBodyInput.value
    }

    getParams() {
        return this.paramsInput.value.split(',')    
    }

    getArgs() {
        return this.argsInput.value
    }

    getDOMObject() { 
        return this.userInputs
    }
}