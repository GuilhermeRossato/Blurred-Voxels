# Blurred Boxes

This is a javascript experiment to simulate a depth of field blur (focus) shader using CSS filters.

[Click here to run the current version](https://rawgit.com/GuilhermeRossato/Blurred-Boxes/master/index.html)

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

A few nested canvases are put in order, each with a different blur radius. Then a different scene is drawn in each canvas. The distance between a block and the camera determines how blurry something will look.

# Problems

CSS filters are slow :v