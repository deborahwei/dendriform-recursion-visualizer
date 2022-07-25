import FuncRunner from "../computer/func_runner";
import { setAttributes } from "../utilities/util";

export default class UserInput {
    constructor() { 
        this.args = ``;
        this.functionBody = ``;
        this.params = ``
        this.func = this.callFuncRunner()

        this.userInputs = document.createElement("div");
        this.userInputs.classList.add("user-inputs")
        this.functionBodyInput = document.createElement("input")
        this.paramsInput = document.createElement("input")
        this.argsInput = document.createElement("input")

        this.userInputs.appendChild(this.functionBodyInput)
        this.userInputs.appendChild(this.paramsInput)
        this.userInputs.appendChild(this.argsInput)
    }

    getUserInput() { 
        const functionBodyInput = document.createElement("ibput")
        setAttributes(functionBodyInput, {
            "type": "text"
        });
    }

    callFuncRunner() {
        return new FuncRunner(this.argsInput, this.functionBody, this.params)
    }

    returnTreeData() { 
        this.treeData = this.func.runFunc()
        return this.treeData
    }

    getDOMObject() { 
        retur
    }
}