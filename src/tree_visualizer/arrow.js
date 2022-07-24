import { setAttributes, svgNameSpace } from "../utilities/util";
import { RADIUS, STROKE_WIDTH, TIME_GAP } from "./constants";

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
        this.gTag = document.createElementNS(svgNameSpace, "g");
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
        
        this.circle = document.createElementNS(svgNameSpace, 'circle')
        setAttributes(this.circle, {
            "cx": this.midPoint[0], 
            "cy": this.midPoint[1], 
            "r": RADIUS/2,
            "fill": "white", // background color
        })

        this.line.classList.add("call-arrow")
        this.text.classList.add("result-text")
        this.text.textContent = this.result

        this.gTag.appendChild(this.defs)
        this.gTag.appendChild(this.line)
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

    hideReturn(){
        this.text.classList.add("hidden")
        this.circle.classList.add("hidden")
    }

    show() { 
        return new Promise(resolve => {
            setTimeout (() => {
                this.line.classList.remove('hidden');
                resolve();
            }, TIME_GAP)
        })
    }

    getId() { 
        return this.id
    }

    return() {
        return new Promise(resolve => {
            setTimeout (() => {
                this.gTag.appendChild(this.circle)
                this.gTag.appendChild(this.text) // shows return value
                this.flipCoors()
                resolve();
            }, TIME_GAP)
        })
    }

    flipCoors() {
        const [x1, y1] = this.startCoor;
        const [x2, y2] = this.endCoor;

        const arrowLength = Math.sqrt((x2 -x1)**2 + (y2-y1)**2) // distance formula 
        const startRatio = arrowLength / RADIUS
        const endRatio = arrowLength / (RADIUS + 4)
        const bigX = x2 - x1 // there are two triangles that are similar
        const bigY = y2 - y1
        this.startCoor = [x1 - (bigX / startRatio), y1 - (bigY / startRatio)] 
        this.endCoor = [x2 + (bigX / endRatio), y2 + (bigY / endRatio)]
        
        setAttributes(this.line, {
            "x1": `${this.endCoor[0]}`,
            "y1": `${this.endCoor[1]}`, 
            "x2": `${this.startCoor[0]}`, 
            "y2": `${this.startCoor[1]}`, 
        }) 
    }

    highlight() { // node currently on
        this.gTag.classList.add("highlight")
    }

}