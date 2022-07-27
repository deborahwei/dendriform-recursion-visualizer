export default class StepDescription {
    constructor(state, functionCalling, functionCalled) {
        this.state = state
        this.functionCalling = functionCalling
        this.functionCalled = functionCalled
        this.description = ''
    }

    createTextDescription () {
        if (state === 'calling') {
            this.description = `fn(${this.functionCalling}) is calling fn(${this.functionCalled})`
        }
        else if (state === 'processing') {
            this.description = `fn(${this.functionCalled}) is being called`
        }
        

    }
}