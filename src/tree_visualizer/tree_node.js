import { setAttributes, svgNameSpace } from "../utilities/util";
import { RADIUS, STROKE_WIDTH} from "./constants";
import NodePosition from "./node_positions";

export default class TreeNode {
    constructor(cx, cy, value) {
        this.r = RADIUS;
        this.gTag = document.createElementNS(svgNameSpace, "g");
        setAttributes(this.gTag, {
            "fill": "white",
            "stroke": "black",
            "stroke-width": STROKE_WIDTH
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
            "stroke-width": STROKE_WIDTH
        });
    

        this.text.classList.add("param-text");
        this.text.textContent = value;

        this.gTag.appendChild(this.circle);
        this.gTag.appendChild(this.text);
    }

    getDOMObject() {
        return this.gTag;
    }
};