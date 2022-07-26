import { setAttributes } from "../utilities/util";
import CodeFlask from "codeflask";

export default class UserInput {
    constructor() { 
        const fibFn = `
        if (n == 0 || n == 1)
        return n
        
        return fn(n-1) + fn(n-2)
        `
        this.functionBody = '';
        this.params = 0;

        this.userInputs = document.createElement("div");
        this.userInputs.classList.add("user-inputs")
        this.lastValidFirstLine = ''
        this.createTextArea()
        this.createParamsInput()

        // this.paramsInput = document.createElement("input");
        // this.paramsLabel = document.createElement("label");
        // this.paramsLabel.innerHTML = "Params: ";
        // setAttributes(this.paramsInput, {
        //     'type': 'text', 
        //     'id': 'params-input', 
        // })
        // setAttributes(this.paramsLabel, {
        //     'for': 'params-input'
        // })

        
        // this.userInputs.appendChild(this.paramsLabel)
        // this.userInputs.appendChild(this.paramsInput)
        
        this.runButton = document.createElement("button");
        this.runButton.innerHTML = "RUN"
        this.userInputs.appendChild(this.runButton)

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
        this.fBFlask.updateCode('function fn() {\n // write code here \n}')
        this.lastValidFirstLine = 'function fn() {'
        
        this.fBFlask.onUpdate((code) => {
            const lines = code.split('\n')
            if (lines[0].slice(0, 12) !== 'function fn(' || lines[0].slice(lines[0].length - 3) !== ') {') {
                lines[0] =  this.lastValidFirstLine
                this.fBFlask.updateCode(lines.join('\n)'))
            }
            else if (lines[lines.length - 1][0] !== '}' || lines.length !== 1){
                lines[lines.length -1] = '}'
                this.fBFlask.updateCode(lines.join('\n'))
            }
            else { 
                this.lastValidFirstLine = lines[0]
            }
        })        
    }

    createParamsInput() { 
        const paramsWrapper = document.createElement('div')
        this.userInputs.appendChild(paramsWrapper)
        setAttributes(paramsWrapper, {
            'id': 'params-wrapper'
        })
        this.paramsFlask = new CodeFlask(paramsWrapper, { 
            language: 'js', 
            defaultTheme: false
        })
    }
    
    addClickEventListener(cb) {
        this.runButton.addEventListener("click", cb)
    }

    getFunctionBody() { 
        const code = this.fBFlask.getCode().split('\n')
        this.functionBody = code.slice(0, code.length - 1).slice(1)
        return this.functionBody
    }

    getParams() { // rework 
        return this.paramsInput.value.split(',')    
    }

    getArgs() { // gets ahold of what is between the parenthesis 
        return this.lastValidFirstLine.slice(0, this.lastValidFirstLine.length -3).slice(12)
    }

    getDOMObject() { 
        return this.userInputs
    }
}