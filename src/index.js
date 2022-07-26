import Graph from "./tree_visualizer/graph";
import ControllerContainer from "./controller/controller_container";
import FuncRunner from "./computer/func_runner";
import PositionCalculator from "./tree_visualizer/position_calculator";
import UserInput from "./controller/user_input";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");

    const root = document.getElementById("root");

    const controller = new ControllerContainer();
    const graph = new Graph();


    root.appendChild(controller.getDOMObject());
    root.appendChild(graph.getDOMObject());  
    
    const userInputs = new UserInput()
    controller.getDOMObject().appendChild(userInputs.getDOMObject())

    userInputs.addClickEventListener( (e) => { 
        e.preventDefault()
        graph.reset()

        const fB = userInputs.getFunctionBody()
        const args = userInputs.getArgs()
        const params = userInputs.getParams()

        // console.log('fb:', fB, 'args: '. args, 'params: ', params)
        // console.log(args)

        const func = new FuncRunner(args, fB, params)
        const treeData = func.runFunc()
        console.log(treeData)
        const positionCalculator = new PositionCalculator(treeData)
        
        graph.resizeViewBox(positionCalculator.getTreeDimensions())
        graph.animate(positionCalculator.getRoot());
    });
    
});