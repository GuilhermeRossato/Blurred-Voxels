# Blurred Boxes

This is a javascript experiment to simulate a depth of field blur (focus) shader using CSS filters.

[Click here to run the current version](http://guilherme-rossato.com/Blurred-Boxes/)

# How to run / build locally

Just open the file index.html on a browser.

# Development

 - First test, basic 3d rendering, two canvases side by side.
![Preview 1](https://github.com/GuilhermeRossato/Blurred-Boxes/blob/master/Images/preview1.gif?raw=true)
 - Depth of field blur effect with 4 canvases
![Preview 2](https://github.com/GuilhermeRossato/Blurred-Boxes/blob/master/Images/preview2.gif?raw=true)
 - Loading screen and world loading animation
![Preview 3](https://github.com/GuilhermeRossato/Blurred-Boxes/blob/master/Images/preview3.gif?raw=true)
 - Final Version, with improved performance and sidebar options
![Preview 4](https://github.com/GuilhermeRossato/Blurred-Boxes/blob/master/Images/preview4.png?raw=true)

# How it works

A few nested canvases are put in order, each with a different blur radius.

Basically each canvas has a range of block "distances" that can be rendered on it. The distance between a block and the camera determines which canvas the block will be drawn on. Each layer of canvas has a different blur radius.

# Problems

CSS filters are slower than a GPU could do it.
