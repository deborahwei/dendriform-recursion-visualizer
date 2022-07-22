export default class NodePosition { // this class finds the position and adds it to our Tree data
    constructor(id) {
        this.id = id
        this.x = 0;
        this.y = 0; 
        this.mod = 0
    }

    traverse(cb) { // this function goes through every node in the tree recursively
        func(this) 
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].traverse(cb)
        }
    }

}