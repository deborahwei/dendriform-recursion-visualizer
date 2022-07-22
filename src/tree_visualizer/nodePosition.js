export default class NodePosition { // this class finds the position and adds it to our Tree data indexing with id
    constructor(id, data) {
        this.data = data
        this.id = id
        this.x = 0;
        this.y = 0; 
        this.mod = 0
        this.children = []
        this.return = data[id].return 
        this.prevNode = null
    }


    getNode() { 
        return this.data[id] 
    }

    addPos() {
        n = getNode()
        n.x = this.x
        n.y = this.y
        n.mod = this.mod
    }

}