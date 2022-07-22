import getSourceCode from "./funcInjector";

export default class FuncRunner {
    constructor(args, functionBody, params) {
        const functionHeader = ["function _fn(", args, "){"].join("");
        const originalFunc = [functionHeader, functionBody, "};"].join("\n");
        const sourceCode = getSourceCode(originalFunc, params);
        console.log(sourceCode);
        this.func = Function(sourceCode);
    }

    getFunc() {
        return this.func;
    }

    runFunc(...args) {
        return this.func(args);
    }
};