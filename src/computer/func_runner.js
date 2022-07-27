import getSourceCode from "./func_injector";

export default class FuncRunner {
    constructor(args, functionBody, params) {
        const functionHeader = ["function _fn(", args, "){"].join("");
        const originalFunc = [functionHeader, functionBody, "};"].join("\n");
        const sourceCode = getSourceCode(originalFunc, params); // gives us back a string
        this.func = Function(sourceCode); // gives us back the string converted to a function 
        console.log(this.func)
    }

    getFunc() {
        return this.func;
    }

    runFunc() { // gives back treeData 
        return this.func();
    }
};