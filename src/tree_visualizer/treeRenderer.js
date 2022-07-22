import { node } from "webpack";
import NodePosition from "./nodePosition";

export default class TreeRenderer {
    constructor(data) { // 
        this.data = data
        this.deepestLevel = -1
        this.rootNode = this.getPosition(0, 0, null)
        this.findDeepestLevel(this.rootNode)
        this.firstTraverse(this.rootNode);
        // this.secondTraverse, 0);
        // this.fixNodeConflicts(this.rootNode);
        // this.shiftTree();
    }

    getPosition(node, level, prevNode) { // makes tree of instances
        let treeNode = new NodePosition(node, this.data) 
        treeNode.level = level; 
        treeNode.prevNode = prevNode 

        for (let i = 0; i < this.data[node].children.length; i++) {
            treeNode.children.push(
                this.getPosition( // recursively calls itself to make more nodes                    
                    this.data[node].children[i], 
                    level + 1, 
                    i >= 1 ? treeNode.children[i -1] : null 
                )
            )
        }
        return treeNode; 
    }

    findDeepestLevel(node) { // dfs to find deepest level
        for (let i = 0; i < node.children.length; i++) {
            this.deepestLevel = Math.max(node.children[i].level, this.deepestLevel)
            this.findDeepestLevel(node.children[i])
        }
    }

    // get y coor of each node by taking the screen size and dividing it by the levels
    getYCoor(screenSize, deepestLevel) {
        increments = screenSize / (deepestLevel + 1)
        for (let i = 0; o < )
    } 


    firstTraverse(node) { // this is the step where we set the initial positions and calculate how much the nodes children have to move to be under their parent
        for (let i = 0; i < node.children.length; i++) { // [1, 4], [2, 3]
            this.firstTraverse(node.children[i]) // 1, 2
        }

        if (node.prevNode) { // checks that it is not the left most child 
            node.x = node.prevNode.x + 1
        }
        else { // value is zero if it is the left most 
            node.x = 0 
        }
        if (node.children.length == 1) { // if that node has only one child then it will be under the node 
            node.mod = node.x
        }
        else if (node.children.length >= 2) { // this calculates the difference between the parent and the average of the min and max coordinates of the node
            let minX = Infinity;
            let maxX = -minX; 
            for (let i = 0; i < node.children.length; i++) { // finding the first and last node childrens 
                minX = Math.min(minX, node.children[i].x)
                maxX = Math.max(maxX, node.children[i].x)
            }
            node.mod = node.x - (maxX- minX) / 2 // finds the average between the two first and last node childrens
        }

    }
   
    fixNodeConflicts(node) { 
        for (let i = 0; i < node.children.length; i++) { 
            this.fixNodeConflicts(node.children[i])
        }

        // find widest contour 
        for (let i = 0; i < node.children.length - 1; i++) {

        }
    }

    thirdTraverse(node, modSum) { // gives final position of each node 
        node.x += modSum 
        for (let i = 0; i < node.children.length; i++) {
            this.secondTraverse(node.children[i].node.mod + modSum);
        }
    }
    


    // shiftTree()
}

