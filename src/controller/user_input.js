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
        this.lastValidParams = ''
        this.createTextArea()
        this.createParamsInput()

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
            else if (lines[lines.length - 1][0] !== '}' || lines[lines.length - 1].length !== 1){
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

        this.paramsFlask.updateCode('fn()')
        this.lastValidParams = 'fn()'

        this.paramsFlask.onUpdate((code) => { 
            const lines = code.split()
            if (lines.length !== 1 || 
                lines[0].slice(0, 3) !== 'fn(' || 
                lines[0].slice(lines[0].length - 1) !== ')') {
                    lines[0] = this.lastValidParams
                    this.paramsFlask.updateCode(lines.join())
                }
            else {
                this.lastValidParams = lines[0]
            }
        })
        
        this.runButton = document.createElement("button");
        this.runButton.innerHTML = "RUN"
        this.userInputs.appendChild(this.runButton)
    }
    
    addClickEventListener(cb) {
        this.runButton.addEventListener("click", cb)
    }

    getFunctionBody() { 
        const code = this.fBFlask.getCode().split('\n')
        this.functionBody = code.slice(0, code.length - 1).slice(1).join('\n')
        return this.functionBody
    }

    getParams() { 
        const code = this.paramsFlask.getCode().split()
        this.params = code[0].slice(0, code[0].length -1).slice(3).split()
        return this.params
    }

    getArgs() { // gets ahold of what is between the parenthesis 
        console.log(this.lastValidFirstLine.split()[0].slice(0, this.lastValidFirstLine.length -3).slice(12))
        return this.lastValidFirstLine.split()[0].slice(0, this.lastValidFirstLine.length -3).slice(12)
    }

    getDOMObject() { 
        return this.userInputs
    }
}