import FuncRunner from "../computer/func_runner";
import { setAttributes } from "../utilities/util";

export default class UserInput {
    constructor() { 
        const fibFn = `
        if (n == 0 || n == 1)
        return n
    
        return fn(n-1) + fn(n-2)
        `
        this.args = "n";
        this.functionBody = fibFn;
        this.params = [7]
        this.func = this.callFuncRunner()

        this.userInputs = document.createElement("div");

        this.functionBodyInput = document.createElement("input");
        this.functionBodyLabel = document.createElement("label");
        this.functionBodyLabel.innerHTML = "Insert recursive function: ";
        setAttributes(this.functionBodyInput, {
            'type': 'text', 
            'id': 'function-body', 
        })
        setAttributes(this.functionBodyLabel, {
            'for': 'function-body'
        })
        
        this.argsInput = document.createElement("input");
        this.argsLabel = document.createElement("label");
        this.argsLabel.innerHTML = "Args: " ;
        setAttributes(this.argsInput, {
            'type': 'text', 
            'id': 'args-input', 
        })
        setAttributes(this.argsLabel, {
            'for': 'args-input'
        })
        
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

        this.userInputs.appendChild(this.functionBodyLabel)
        this.userInputs.appendChild(this.functionBodyInput)

        this.userInputs.appendChild(this.paramsLabel)
        this.userInputs.appendChild(this.paramsInput)
        
        this.userInputs.appendChild(this.argsLabel)
        this.userInputs.appendChild(this.argsInput)
    }

    getUserInput() { 
        const functionBodyInput = document.createElement("input")
        setAttributes(functionBodyInput, {
            "type": "text"
        });
    }

    callFuncRunner() {
        return new FuncRunner(this.args, this.functionBody, this.params)
    }

    getTreeData() { 
        this.treeData = this.func.runFunc()
        return this.treeData
    }

    getDOMObject() { 
        return this.userInputs
    }
}