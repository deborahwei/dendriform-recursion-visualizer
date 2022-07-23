import { setAttributes, svgNameSpace } from "../utilities/util";

export default class Arrow {
    constructor(id, startCoor, endCoor) {  // 
        this.startNodeId = id
        this.markerWidth = 10
        this.markerHeight = 7
        this.startCoor = startCoor 
        this.endCoor = endCoor 
        this.endCoor = endCoor
        this.defs = document.createElementNS(svgNameSpace, "defs");
        this.gTag = document.createElementNS(svgNameSpace, "g")
        this.marker = document.createElementNS(svgNameSpace, "marker") // gives arrowhead
        setAttributes(this.marker, {
            "id": `arrowhead-${this.startNodeId}`,
            "markerWidth": this.markerWidth,
            "markerHeight": this.markerHeight, 
            "refX": '1', 
            "refY": '1',
            "orient": 'auto', 
            "markerUnits": 'strokeWidth'
        });

        this.line = document.createElementNS(svgNameSpace, "line")
        setAttributes(this.line, {
            "x1": `${startCoor[0]}`, // where the line starts
            "y1": `${startCoor[1]}`, 
            "x2": `${endCoor[0]}`, // where the line ends
            "y2": `${endCoor[1]}`, 
            "marker-end": `url(#arrowhead-${this.startNodeId})`
        })
        this.path = document.createElementNS(svgNameSpace, 'path')
        setAttributes(this.path, {
            "d": 'M 1,0 L 1,2 L 3,1 Z'
        })
        

        this.line.classList.add("call-arrow")

        this.gTag.appendChild(this.defs)
        this.defs.appendChild(this.marker)
        this.gTag.appendChild(this.line)
        this.marker.appendChild(this.path)
    }
};