import NodePosition from "./node_positions";

export default class PositionCalculator {
    constructor(data) { //
        this.depth = 0; 
        this.data = data;
        this.leftestContour;
        this.SPACE_BW = 30;
        this.SCREENSIZE = 100 // testing
        this.rootNode = this.getPosition(0, 1, null)
        this.increments = this.SCREENSIZE / (this.depth);
        this.getYCoor(this.rootNode, this.increments);
        this.firstTraverse(this.rootNode);
        this.secondTraverse(this.rootNode, 0);
        // this.fixNodeConflicts(this.rootNode);
    }

    getRoot() {
        return this.rootNode;
    }

    getPosition(node, level, prevNode) { // makes tree of instances
        this.depth = Math.max(level, this.depth);
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
        node.y = node.level * this.increments;
        for (const i in node.children) {
            this.getYCoor(node.children[i]);
        }
    } 

    firstTraverse(node) { // this is the step where we set the initial positions and calculate how much the nodes children have to move to be under their parent

        for (let i = 0; i < node.children.length; i++) { // [1, 4], [2, 3]
            this.firstTraverse(node.children[i]) // 1, 2
        }
        if (node.prevNode) { // checks that it is not the left most child 
            node.x = node.prevNode.x + this.SPACE_BW

        }
        else { // value is zero if it is the left most 
            node.x = 0 
        }
        if (node.children.length == 1) { // if that node has only one child then it will be under the node 
            node.mod = node.x
        }
        else if (node.children.length >= 2) {
            node.mod = node.x - ((node.children[node.children.length-1].x + node.children[0].x) / 2) // finds the average between the two first and last node childrens
        }
    }

    secondTraverse(node, modSum) { // gives final position of each node
        node.x += modSum 
        modSum += node.mod

        for (let i = 0; i < node.children.length; i++) {
            this.secondTraverse(node.children[i], modSum);
        }
        // console.log(node)
    }
   
    fixNodeConflicts(node) { 
        for (let i = 0; i < node.children.length; i++) { 
            this.fixNodeConflicts(node.children[i])
        }

        for (let i = 0; i < node.children.length; i++) {
            let rightContour = -Infinity;
            node.children[i].traverse((curNode) => {
                rightContour = Math.max(rightContour, curNode.x)
            })

            let leftContour = Infinity;
            node.children[i].traverse((curNode) => { // want to find the node next to it's left contour because the right of one tree collides with the left of another 
                leftContour = Math.min(leftContour, curNode.x)
                this.leftestContour = Math.min(this.leftestContour, leftContour)
            })

            if (rightContour >= leftContour) { // if the right part of the left tree is overlapping, iterate through the right tree and move everything over
                node.children[i+ 1].traverse( (curNode) => {
                    curNode.x += (rightContour - leftContour + this.SPACE_BW)
                })
            }
        }
    }

    shiftTrees(overflow, node) {
        const shift = -overflow
        if (shift > 0) {
            node += shift
        }
        for (let child of node.children) {
            this.shiftTrees(overflow, child)
        }
    }
}

