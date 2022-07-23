import NodePosition from "./node_positions";
import { SPACE_X, SPACE_Y } from "./constants";

export default class PositionCalculator {
    constructor(data) { //
        this.data = data;
        this.maxX = 0;
        this.maxY = 0;

        this.rootNode = this.getPosition(0, 1, null);
        this.getYCoor(this.rootNode, SPACE_Y);
        this.firstTraverse(this.rootNode);
        this.centerChildren(this.rootNode);
        this.applyMod(this.rootNode);
        this.shiftTrees(this.rootNode);

    }

    getTreeDimensions() {
        return [this.maxX + SPACE_X, this.maxY + SPACE_Y] 
    }

    getRoot() {
        return this.rootNode;
    }

    getPosition(node, level, prevNode) { // makes tree of instances
        let treeNode = new NodePosition(node, this.data[node].input, this.data[node].result);
        treeNode.level = level;
        treeNode.y = level;
        treeNode.prevNode = prevNode;


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

    // get y coor of each node by multiplying level by increment
    getYCoor(node) {
        node.y = node.level * SPACE_Y;
        for (const i in node.children) {
            this.getYCoor(node.children[i]);
        }
    } 

    firstTraverse(node) { // this is the step where we set the initial positions and calculate how much the nodes children have to move to be under their parent

        for (let i = 0; i < node.children.length; i++) { // [1, 4], [2, 3]
            this.firstTraverse(node.children[i]); // 1, 2
            this.fixNodeConflicts(node);
        }
    }

    centerChildren(node) {
        for (let i = 0; i < node.children.length; i++) { // [1, 4], [2, 3]
            this.centerChildren(node.children[i]) // 1, 2
        }
        if (node.children.length == 1) { // if that node has only one child then it will be under the node 
            node.mod = node.x
        }
        else if (node.children.length >= 2) {
            node.mod = node.x - ((node.children[node.children.length-1].x + node.children[0].x) / 2) // finds the average between the two first and last node childrens
        }
    }


    applyMod(node, modSum = 0) { // gives final position of each node
        node.x += modSum 
        modSum += node.mod
        node.mod = 0;

        for (let i = 0; i < node.children.length; i++) {
            this.applyMod(node.children[i], modSum);
        }
    }
   
    fixNodeConflicts(node) { 
        for (let i = 0; i < node.children.length; i++) { 
            this.fixNodeConflicts(node.children[i])
        }

        for (let i = 0; i < node.children.length - 1; i++) {
            let rightContour = -Infinity;
            node.children[i].traverse((curNode) => {
                rightContour = Math.max(rightContour, curNode.x);
            })

            let leftContour = Infinity;
            node.children[i+1].traverse((curNode) => { // want to find the node next to it's left contour because the right of one tree collides with the left of another 
                leftContour = Math.min(leftContour, curNode.x);
            })
            if (rightContour >= leftContour) { // if the right part of the left tree is overlapping, iterate through the right tree and move everything over
                node.children[i+ 1].traverse( (curNode) => {
                    curNode.x += (rightContour - leftContour + SPACE_X)
                })
            }
        }
    }

    shiftTrees(node) {
        let leftestContour = Infinity

        for (let i = 0; i < node.children.length - 1; i++) {
            node.children[i].traverse((curNode) => {
                leftestContour = Math.min(leftestContour, curNode.x);
            })
        const shift = -leftestContour + SPACE_X
        if (shift > 0) {
            node.traverse ((curNode) => {
                curNode.x += shift
                this.maxX = Math.max(this.maxX, curNode.x); // finds the most right our tree goes
                this.maxY = Math.max(this.maxY, curNode.y); // the depth of our tree
            })
        }
    }
}}