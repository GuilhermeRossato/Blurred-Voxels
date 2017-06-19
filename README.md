# Blurred Boxes

This is a javascript experiment to simulate a depth of field blur (focus) shader using CSS filters.

[Click here to run the current version](https://rawgit.com/GuilhermeRossato/Blurred-Boxes/master/index.html)

# How to run / build locally

Just open the file index.html on a browser.

# Development

 - First test, basic 3d rendering, two canvases side by side.
![Preview 1](https://github.com/GuilhermeRossato/Blurred-Boxes/blob/master/Images/preview1.gif?raw=true)

# How it works

A few nested canvases are put in order, each with a different blur radius. Then a different scene is drawn in each canvas. The distance between a block and the camera's target determines which scene it will be part of (basically, the further away, the more blur it will be drawn with).

# Problems

CSS filters are slow :v