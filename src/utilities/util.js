export const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    })
}

export const svgNameSpace = "http://www.w3.org/2000/svg";