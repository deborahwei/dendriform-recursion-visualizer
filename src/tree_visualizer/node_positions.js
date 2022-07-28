import Arrow from "./arrow";
import TreeNode from "./tree_node";

export default class NodePosition { // this class finds the position and adds it to our Tree data indexing with id
    constructor(id, input, result) {
        this.id = id;
        this.x = 0;
        this.y = 0; 
        this.mod = 0
        this.input = input;
        this.result = result;
        this.children = [];
        this.prevNode = null;
        this.level = -1;
        this.treeNode = null;
        this.thread = null;
    }

    traverse(cb) {
        cb(this);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].traverse(cb);
        }
    }

    getDOMObject() {
        if (!this.treeNode)
            this.treeNode = new TreeNode(this.x, this.y, this.input);
        return this.treeNode.getDOMObject();
    }

    getTreeNode() { 
        return this.treeNode
    }


}