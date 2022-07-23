import getSourceCode from "./funcInjector";

export default class FuncRunner {
    constructor(args, functionBody, params) {
        const functionHeader = ["function _fn(", args, "){"].join("");
        const originalFunc = [functionHeader, functionBody, "};"].join("\n");
        const sourceCode = getSourceCode(originalFunc, params); // gives us back a string
        console.log(sourceCode);
        this.func = Function(sourceCode); // gives us back the string converted to a function 
    }

    getFunc() {
        return this.func;
    }

    runFunc() {
        return this.func();
    }
};