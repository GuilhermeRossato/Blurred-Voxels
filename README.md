# Blurred Voxels

This is a javascript experiment to simulate a depth of field blur (focus) shader using CSS filters.

[Click here to run the current version](https://grossato.com.br/static/Blurred-Voxels/)

# Motivation

CSS filters are a new browser feature and and I had an idea of using the blur filter to create graphical effects like the ones in games where things that are close look sharp and things that are far away look blurred.


I expected the browser's engine to be optimized, but it turns out that CSS filters are not very fast. Layering multiple canvas with different filters just isn't very easy for the GPU because of how isolated they are, causing a lot of delay between context switches. I can keep up at 30fps on a high end GPU on the largest setting (50 chunks), but barely keep at 15 fps on a general purpose GPU.

# How to run / build locally

You can run it on production by [clicking here](https://grossato.com.br/static/Blurred-Voxels/).

To run locally you just need to use a static server. If you have [php](https://www.php.net) and [npm](https://nodejs.org/en/) installed you can open your terminal and run this:

```
npm run serve-php
```

it should open up http://localhost:8080 on your browser with this project running.

If you don't have php, are on Windows OS, and have chrome installed on the default directory (`C:\Program Files (x86)\Google\Chrome\Application`) you can run the batch file at `./Tools/run-chrome.bat` to open chrome with the correct parameters to allow the application to run. 

That's it. No building or dependency downloading necessary, everything is self contained.

# Development Milestones

 - First test, basic 3d rendering, two canvases side by side.
![Preview 1](https://github.com/GuilhermeRossato/Blurred-Voxels/blob/master/Images/preview1.gif?raw=true)
 - Depth of field blur effect with 4 canvases
![Preview 2](https://github.com/GuilhermeRossato/Blurred-Voxels/blob/master/Images/preview2.gif?raw=true)
 - Loading screen and world loading animation
![Preview 3](https://github.com/GuilhermeRossato/Blurred-Voxels/blob/master/Images/preview3.gif?raw=true)
 - Final Version, with improved performance and sidebar options
![Preview 4](https://github.com/GuilhermeRossato/Blurred-Voxels/blob/master/Images/preview4.png?raw=true)

# How it works

A few nested canvases are put in order, each with a different blur radius.

Each canvas has a range of block "distances" that can be rendered on it. The distance between a block and the camera determines which canvas each block will be drawn on. Each layer of canvas has a different blur radius. Basically objects further away are on a blurred canvas and objects closer to the camera are 

# Dependencies

It uses three.js to draw the screen on a html canvas element.