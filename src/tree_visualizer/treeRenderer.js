import NodePosition from "./nodePosition";

export default class TreeRenderer {
    constructor(data) { // 
        this.data = data
        this.root = this.data[0];
        this.rootNode = this.getPosition(this.root, 0, null);
        this.firstTraverse(this.rootNode);
        this.secondTraverse(this.rootNode, 0);
        this.fixNodeConflicts(this.rootNOde);
        this.shiftTree();
    }


    getPosition(node, level, prevNode)  {// makes tree of instances
        const keys = Object.keys[data]
        let treeNode = new nodePosition(keys[0])
        
    }
    firstTraverse(node)

    secondTraverse(node)
    
    fixNodeConflicts(node)

    shiftTree()
}