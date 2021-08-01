# Blurred Voxels

This is a javascript experiment to simulate a depth of field blur (focus) shader using CSS filters.

[Click here to run the current version](https://grossato.com/Blurred-Voxels/)

# Motivation

CSS filters were relatively new and I thought they were very powerful so I thought I would use it to create graphical effects in the chance it was performatic (I expected the browser's engine to be very optimized).

Turns out CSS filters are not super-optimized, but this is still a great experiment that allowed me to learn a bunch of things.

# How to run / build locally

[Click here](https://grossato.com/Blurred-Voxels/) to run the current version of the project.

To run locally, you must know that this application needs to be served from a web server or at least loaded with chrome's security disabled.

I prefer you use [php](https://www.php.net) and [npm](https://nodejs.org/en/) to run it, so if you have both installed correctly you can just use this command:

```
npm run serve-php
```

If you don't have php, are on Windows OS, and have chrome installed on the default directory (`C:\Program Files (x86)\Google\Chrome\Application`) you can run the batch file at `./Tools/run-chrome.bat` to open chrome with the correct parameters to allow the application to run. Alternatively you can use the following npm command to run the batch file:

```
npm run serve-php
```

That's it. No building necessary.

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

# Problems

CSS filters are slow, I just needed to know how slow.
