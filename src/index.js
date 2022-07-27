import Graph from "./tree_visualizer/graph";
import ControllerContainer from "./controller/controller_container";
import FuncRunner from "./computer/func_runner";
import PositionCalculator from "./tree_visualizer/position_calculator";
import UserInput from "./controller/user_input";
import Error from "./error/error";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");

    const root = document.getElementById("root");
    
    const controller = new ControllerContainer();
    root.appendChild(controller.getDOMObject());
    
    const bottomContainer = document.createElement("div")
    root.appendChild(bottomContainer)
    bottomContainer.classList.add('bottom-container')

    const graph = new Graph();
    bottomContainer.appendChild(graph.getDOMObject())

    // const error = new Error("uh oh")
    // console.log(error)
    // graph.getDOMObject().appendChild(error.getDOMObject())

    
    const userInputs = new UserInput()
    controller.getDOMObject().appendChild(userInputs.getDOMObject())
    controller.getDOMObject().appendChild(userInputs.getdefaultFunction())

    graph.navSteps.addClickEventListener('runButton', (e) => { 
        e.preventDefault()
        graph.reset()

        const fB = userInputs.getFunctionBody()
        const args = userInputs.getArgs()
        const params = userInputs.getParams()

        // console.log('fb:', fB, 'args: '. args, 'params: ', params)
        // console.log(args)

        const func = new FuncRunner(args, fB, params)
        const treeData = func.runFunc()
        const positionCalculator = new PositionCalculator(treeData)
        
        graph.resizeViewBox(positionCalculator.getTreeDimensions())
        graph.animate(positionCalculator.getRoot());
    });
    
});