import { setAttributes, svgNameSpace } from "../utilities/util";
import { RADIUS } from "./constants";

export default class TreeNode {
    constructor(cx, cy, value) {
        this.r = RADIUS;
        this.strokeWidth = 1;
        this.gTag = document.createElementNS(svgNameSpace, "g");
        setAttributes(this.gTag, {
            "fill": "white",
            "stroke": "black",
            "stroke-width": this.strokeWidth    
        });

        this.circle = document.createElementNS(svgNameSpace, "circle");
        setAttributes(this.circle, {
            "cx": cx,
            "cy": cy,
            "r": this.r
        });

        this.text = document.createElementNS(svgNameSpace, "text");
        setAttributes(this.text, {
            "x": cx,
            "y": cy,
            "stroke-width": this.strokeWidth
        });
        
        this.arrow = document.createElementNS(svgNameSpace, "path");
        

        this.text.classList.add("param-text");
        this.text.textContent = value;

        this.gTag.appendChild(this.circle);
        this.gTag.appendChild(this.text);
    }

    getDOMObject() {
        return this.gTag;
    }
};