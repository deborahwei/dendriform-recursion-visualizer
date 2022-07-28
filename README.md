# Dendriform | Recursion Visualizer
By Deborah Wei 

## Background 

[Dendriform](https://deborahwei.github.io/dendriform/) is a recursion tree visualizer that uses DFS to recursively call itself. This makes it easier for people to understand and visually see the calls made by the recursive functions including which function is being called and the output of each call. 

## Features 

Users are able to

* Select default functions 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/1a.gif)

* Insert their own recursive function 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/1b.gif)

* Iterate through the branches (steps) of the recursive calls 

![](https://github.com/deborahwei/dendriform/blob/main/assets/gifs/4a.gif)

## Code Snippets 

The Reingold-Tilford algorithm was used to generate the trees dynamically that prevented them from intersecting with one another and spacing out appropriately. There are multiple traverses made on the tree in order to accomodate the changing branches and the growing size of the functions. Succinctly, the algorithm traverses through the tree using DFS to position the nodes and refactor their coordinates if any conflicts are found. 

In order to create the algorithm that takes in the functions to create the data necessary to create the tree, strings needed to be converted into code. Using the Function class, the source code was able to become converted into code which then generated a hash containing each node's child, input and result. The string that is passed into this function consists of calling the function, passing in parameters, and the function body, which are all passed into our constant funcInjector.




