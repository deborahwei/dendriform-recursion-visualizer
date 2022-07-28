<p align="center">
  <img width="500" height="300" src="https://github.com/deborahwei/dendriform/blob/main/assets/images/logo.png">
</p>

## Background 

[Dendriform](https://deborahwei.github.io/dendriform/) is a recursion tree visualizer that uses **DFS** to recursively call itself and **Reingold-Tilford** to create the tree node structure. This makes it easier for people to understand and visually see the calls made by the recursive functions including which function is being called and the output of each call. This data is visualized through three steps: 1) Obtaining the data and recording it 2) Using the data to find the respective coordinates of each node 3) Displaying the data at those points.

## Features 

Users are able to

* Select default functions 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/1a.gif)

* Insert their own recursive function 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/1b.gif)

* Iterate through the branches (steps) of the recursive calls 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/4a.gif)

## Code Snippets 

In order to create the algorithm that takes in the functions to create the data necessary to create the tree, the recursive function has to be run while recording what the params, results, and children of each call (node). In order to do this, another function was created that runs the user's defined function while storing those variables into a hash. This is stored as a string constant called **injectedFunc**. This string is then passed through Function which runs the code and returns the tree data. A max call limit to prevent an infinite call stack and creates a tree with not too many nodes so that it is no longer comprehensible to the user.

```
const injectedFunc = `
const stack = [];
const treeData = {};
const MAX_CALLS = 100;
let nodeId = -1;

function fn(...args) {
    if (MAX_CALLS < Object.keys(treeData).length) {
        throw "MAXIMUM NUMBER OF CALLS EXCEEDED";
    }
    nodeId++; // keeps track of what the node's unique id is 

    const currNode = {
        input: args,
        result: null,
        children: []
    }
    treeData[nodeId] = currNode; 

    if (stack.length)
        treeData[stack[stack.length-1]].children.push(nodeId);
    
    stack.push(nodeId);
    currNode.result = _fn(...args);
    stack.pop(); // pops off after something is return 
    return currNode.result;
}
`;
```

The **Reingold-Tilford** algorithm was used to generate the trees dynamically that prevented them from intersecting with one another and spacing out appropriately. There are multiple traverses made on the tree in order to accomodate the changing branches and the growing size of the functions. Succinctly, the algorithm traverses through the tree using DFS to position the nodes and refactor their coordinates if any conflicts are found. This is done through **NodeConflicts** which takes the most right (**rightContour**) and most left (**leftContour**) bounds of the subtree and sees if there are any conflicts with their neighboring subtrees. Using **DFS**, these bounds are recorded and applies this function to each part of the tree. After finding the conflics, the x-coordinates is adusted by taking the difference between the two contours and adding space so the nodes are not immediately next to one another.

```
    fixNodeConflicts(node) { 
        for (let i = 0; i < node.children.length; i++) { 
            this.fixNodeConflicts(node.children[i])
        }

        for (let i = 0; i < node.children.length - 1; i++) {
            let rightContour = -Infinity;
            node.children[i].traverse((curNode) => {
                rightContour = Math.max(rightContour, curNode.x);
            })
            
            let leftContour = Infinity;
            node.children[i+1].traverse((curNode) => { 
                leftContour = Math.min(leftContour, curNode.x);
            })
            if (rightContour >= leftContour) { 
                node.children[i+ 1].traverse( (curNode) => {
                    curNode.x += (rightContour - leftContour + SPACE_X)
                })
            }
        }
    }
```
