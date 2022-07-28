import { setAttributes, svgNameSpace } from "../utilities/util";
import { RADIUS, STROKE_WIDTH} from "./constants";

export default class TreeNode {
    constructor(cx, cy, value) {
        this.value = value
        this.r = RADIUS;
        this.complete = false
        this.gTag = document.createElementNS(svgNameSpace, "g");
        setAttributes(this.gTag, {
            "fill": "white",
            "stroke-width": STROKE_WIDTH
        });
        this.gTag.classList.add("processing");

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
            "stroke-width": STROKE_WIDTH
        });
    

        this.text.classList.add("param-text");
        this.text.textContent = this.value;

        this.gTag.appendChild(this.circle);
        this.gTag.appendChild(this.text);
    }

    getDOMObject() {
        return this.gTag;
    }


};