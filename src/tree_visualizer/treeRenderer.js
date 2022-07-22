import NodePosition from "./nodePosition";

export default class TreeRenderer {
    constructor(data) { // 
        this.data = data
        this.rootNode = data[0]
        // this.firstTraverse(this.rootNode);
        // this.secondTraverse(this.rootNode, 0);
        // this.fixNodeConflicts(this.rootNOde);
        // this.shiftTree();
    }

    // getPosition(node, level, prevNode)  { // makes tree of instances
    //     let treeNode = new NodePosition(node, this.data) 
    //     treeNode.x = level; // 0
    //     treeNode.prevNode = prevNode // null 

    //     for (let i = 0; i < this.data[node].children.length; i++) {
    //         treeNode.children.push(
    //             this.getPosition( // recursively calls itself to make more nodes                    
    //                 node.children[i], 
    //                 level + 1, 
    //                 i >= 1 ? treeNode.children[i -1] : null 
    //             )
    //         )
    //     }
    //     return treeNode; 
    // }


    firstTraverse(node) {
        for (let i = 0; i < data[node].children.length; i++) { // [1, 4], [2, 3]
            this.firstTraverse(node.children[i]) // 1, 2
        }

        if (node.prevNode) { // checks that it is not the left most child 
            node.y = node.prevNode.y + 1
        }
        else {
            node.y = 0
        }
        if (node.children.length == 1) { // if that node has only one child then it will be under the node 
            node.modifier = node.y 
        }
        else if (node.children.length >= 2) {
            let minY = Infinity;
            let maxY = -minY; 
            for (let i = 0; i < node.children.length; i++) {
                minY = Math.min(minY, node.children[i].y)
                maxY = Math.max(maxY, node.children[i], y)
            }
            node.modifier = node.y - (maxX- minY) / 2
        }
    }

    // secondTraverse(node)
    
    // fixNodeConflicts(node)

    // shiftTree()
}