import Graph from "./tree_visualizer/graph";
import ControllerContainer from "./controller/controller_container";
import FuncRunner from "./computer/func_runner";
import PositionCalculator from "./tree_visualizer/position_calculator";
import UserInput from "./controller/user_input";
import Error from "./error/error";
import Instructions from "./instructions/instructions"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");

    const root = document.getElementById("root");

    const instructions = new Instructions();
    root.appendChild(instructions.getDOMObject());
    
    const controller = new ControllerContainer();
    root.appendChild(controller.getDOMObject());
    
    const bottomContainer = document.createElement("div")
    root.appendChild(bottomContainer)
    bottomContainer.classList.add('bottom-container')

    const graph = new Graph();
    bottomContainer.appendChild(graph.getDOMObject())

    const userInputs = new UserInput()
    controller.getDOMObject().appendChild(userInputs.getDOMObject())
    controller.getDOMObject().appendChild(userInputs.getdefaultFunction())

    const err = new Error()
    bottomContainer.appendChild(err.getDOMObject())

    graph.navSteps.addClickEventListener('runButton', (e) => { 
        e.preventDefault()
        graph.reset()

        const fB = userInputs.getFunctionBody()
        const args = userInputs.getArgs()
        const params = userInputs.getParams()

        try {
            const func = new FuncRunner(args, fB, params)
            const treeData = func.runFunc()
            const positionCalculator = new PositionCalculator(treeData)
            
            graph.resizeViewBox(positionCalculator.getTreeDimensions())
            graph.animate(positionCalculator.getRoot());
        }
        catch(e) {
            err.updateMessage(e)
            err.show()
        }
    });
    
});