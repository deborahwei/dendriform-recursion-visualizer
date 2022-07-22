import { setAttributes, svgNameSpace } from "../utilities/util";

export default class TreeNode {
    constructor(cx, cy, r, strokeWidth, value) {
        this.gTag = document.createElementNS(svgNameSpace, "g");
        setAttributes(this.gTag, {
            "fill": "white",
            "stroke": "green",
            "stroke-width": strokeWidth
        });

        this.circle = document.createElementNS(svgNameSpace, "circle");
        setAttributes(this.circle, {
            "cx": cx,
            "cy": cy,
            "r": r
        });

        this.text = document.createElementNS(svgNameSpace, "text");
        setAttributes(this.text, {
            "x": cx,
            "y": cy,
            "stroke-width": strokeWidth/2
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