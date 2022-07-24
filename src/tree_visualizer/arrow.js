import { setAttributes, svgNameSpace } from "../utilities/util";
import { RADIUS, STROKE_WIDTH } from "./constants";

export default class Arrow {
    constructor(id, result, startCoor, endCoor) {  // 
        this.id = `line-${id}`
        this.markerWidth = 50
        this.markerHeight = 30
        this.startCoor = startCoor 
        this.endCoor = endCoor 
        this.result = result 
        this.midPoint = 0
        this.scaleCoors(this.startCoor,this.endCoor)
        this.findMidpoint()
        this.defs = document.createElementNS(svgNameSpace, "defs");
        this.gTag = document.createElementNS(svgNameSpace, "g")
        this.marker = document.createElementNS(svgNameSpace, "marker") // gives arrowhead
        setAttributes(this.marker, {
            "id": `arrowhead-${this.id}`,
            "markerWidth": this.markerWidth,
            "markerHeight": this.markerHeight, 
            "refX": '1', 
            "refY": '1',
            "orient": 'auto', 
            "markerUnits": 'strokeWidth'
        });

        this.line = document.createElementNS(svgNameSpace, "line")
        setAttributes(this.line, {
            "x1": `${this.startCoor[0]}`, // where the line starts
            "y1": `${this.startCoor[1]}`, 
            "x2": `${this.endCoor[0]}`, // where the line ends
            "y2": `${this.endCoor[1]}`, 
            "marker-end": `url(#arrowhead-${this.id})`, 
            "id": `${this.id}`
        })
        this.path = document.createElementNS(svgNameSpace, 'path')
        setAttributes(this.path, {
            "d": 'M 1,0 L 1,2 L 3,1 Z'
        })

        this.text = document.createElementNS(svgNameSpace, 'text')
        setAttributes(this.text, { 
            "x": this.midPoint[0], 
            "y": this.midPoint[1], 
            "stroke-width": STROKE_WIDTH
        });
        

        this.line.classList.add("call-arrow")
        this.text.classList.add("result-text")

        this.gTag.appendChild(this.defs)
        this.gTag.appendChild(this.line)
        this.gTag.appendChild(this.text)
        this.defs.appendChild(this.marker)
        this.marker.appendChild(this.path)
    }

    scaleCoors(start, end) {
        const [x1, y1] = start;
        const [x2, y2] = end;

        const arrowLength = Math.sqrt((x2 -x1)**2 + (y2-y1)**2) // distance formula 
        const startRatio = arrowLength / RADIUS
        const endRatio = arrowLength / (RADIUS + 4)
        const bigX = x2 - x1 // there are two triangles that are similar
        const bigY = y2 - y1
        this.startCoor = [x1 + (bigX / startRatio), y1 + (bigY / startRatio)] 
        this.endCoor = [x2 - (bigX / endRatio), y2 - (bigY / endRatio)]
    }

    findMidpoint() { 
        const [x1, y1] = this.startCoor;
        const [x2, y2] = this.endCoor;

        this.midPoint = [(x1 + x2)/2, (y1+y2)/2]
    }

    getDOMObject() {
        return this.gTag;
    }

    hide() {
        this.line.classList.add('hidden')
    } 

    show() { 
        return new Promise(resolve => {
            setTimeout (() => {
                this.line.classList.remove('hidden');
                resolve();
            }, 300)
        })
    }

    getId() { 
        return this.id
    }

    return() {
        return this.result 
    }

};