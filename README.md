# Assignment 1: Babylon.js and TypeScript

**Due: Monday, September 20, 10:00pm CDT**

This is a skeleton of a small project that will let you build, debug, and run Babylon applications locally.

The objective of this assignment is twofold:
1. Get your computer set up to work with the toolset we are using.
2. Do a little bit of work with Babylon.

## Submission Information

You should fill out this information before submitting your assignment.  Make sure to document the name and source of any third party assets such as 3D models, textures, or any other content used that was not solely written by you.  Include sufficient detail for the instructor or TA to easily find them, such as asset store or download links.

Name: 

UMN Email:

Build URL:

Third Party Assets:

## Rubric

Graded out of 10 points. Each of the parts to be added are presented in lecture or covered in one of the lessons in the [Babylon 101](https://doc.babylonjs.com/babylon101/) tutorials.

1. Ensure your program builds with no TypeScript warnings. (1)
2. Add the debug layer to your scene. (1)
3. Add an interesting texture to the ground plane and position the plane to be centered under the initial position of the camera. (1)
5. Use the MeshBuilder to add at least 2 objects with interesting textures, sitting on the ground. (2)
5. Add a SpotLight to the scene that is a color other than white, located a reasonable distance above the viewer's initial position.  Aim the light at a downward angle so it illuminates the objects added to your scene. (1)
6. Use keyframe animation to add at least 2 moving objects above the ground, but below the spot light. (2)
7. Add shadows for the spot light. (1)
8. Build the program by executing `npm run build` and then upload the contents of the `dist` folder to your public `.www` directory.  Make sure to set the permissions so that it loads correctly in a web browser.  You should include this URL in submission information section of your `README.md` file. (1)

**Bonus Challenge:** When you click on one of your objects with the mouse, play a sound and have a particle system shoot particles out from the center of the object. (1)

This assignments assumes that you will find your own texture images on the internet.  Make sure to document all of these third party assets. You won't be judged on aesthetics, but I do want you to do more than just copy from the tutorials.  ***Be aware that points will be deducted for using third party assets that are not properly documented.***

## Submission

You will need to check out and submit the project through GitHub classroom.  The project folder should contain just the additions to the sample project that are needed to implement the project.  Do not add extra files, and do not remove the `.gitignore` file (we do not want the "node_modules" directory in your repository.)

**Do not change the names** of the existing files.  The TA needs to be able to test your program as follows:

1. cd into the directory and run ```npm install```
2. start a local web server and compile by running ```npm run start``` and pointing the browser at your ```index.html```

Please test that your submission meets these requirements.  For example, after you check in your final version of the assignment to GitHub, check it out again to a new directory and make sure everything builds and runs correctly.

## Dependencies

The sample has already been set up with a complete project for Typescript development.

To work with this sample and prepare your submission, you should have Node.js installed, which you can retrieve from [nodejs.org](http://nodejs.org) or by downloading `npm` using a package manager.

In addition to Node, you should make sure a recent (e.g., version 3.9 or later) version of Typescript is installed.  The easiest way to do this is by executing `npm install --global typescript`.

## Local Development 

After checking out the project, you need to initialize by pulling the dependencies with:
```
npm install
```

After that, you can compile and run a server with:
```
npm run start
```

Under the hood, we are using the `npx` command to both build the project (with webpack) and run a local http webserver on your machine.  The included ```package.json``` file is set up to do this automatically.  You do not have to run ```tsc``` to compile the .js files from the .ts files;  ```npx``` builds them on the fly as part of running webpack.

You can run the program by pointing your web browser at ```https://localhost:8080```.

## Build and Deployment

After you have finished the assignment, you can build a distribution version of your program with:

```
npm run build
```

This will generate an `index.html` file and a Babylon bundle in the `dist` subdirectory of your project.  Note that this generated code is not human readable, so you can deploy the contents of this directory without worrying about other students copying your code.

To complete the final step in this assignment, you will need to set up a public `.www` directory in your CSE Labs account and follow these steps:

1. If you don’t already have a CSE Labs account, you should [request one from CSE-IT](https://cseit.umn.edu/knowledge-help/account-access) (do this now). 
2. Log in to your CSE Labs account using [SSH](https://cseit.umn.edu/knowledge-help/learn-about-ssh) or [VOLE](https://vole.cse.umn.edu/). 
3. Follow the instructions to [set up your homepage](https://cseit.umn.edu/knowledge-help/homepages-cs-cselabs) provided by CSE-IT. You should now be able to access your web folder by opening `http://www-users.cselabs.umn.edu/~<username>/` in a web browser.
4. [Copy](https://cseit.umn.edu/knowledge-help/transfer-file) the contents of your project's `dist` folder to a subdirectory within the `.www` folder of your CSE Labs account.
5. Make sure to set the [public permissions](https://cseit.umn.edu/knowledge-help/homepages-cs-cselabs) so that the directory is executable and files are readable.

If you have problems with any of the steps above, you should contact the CSE-IT help desk by emailing [csehelp@umn.edu](mailto:csehelp@umn.edu).  

## License

Material for [CSCI 5619 Fall 2020](https://canvas.umn.edu/courses/194179) by [Evan Suma Rosenberg](https://illusioneering.umn.edu/) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

The intent of choosing CC BY-NC-SA 4.0 is to allow individuals and instructors at non-profit entities to use this content.  This includes not-for-profit schools (K-12 and post-secondary). For-profit entities (or people creating courses for those sites) may not use this content without permission (this includes, but is not limited to, for-profit schools and universities and commercial education sites such as Coursera, Udacity, LinkedIn Learning, and other similar sites).   

## Acknowledgments

This assignment was based upon content from the [3D User Interfaces Fall 2020](https://github.blairmacintyre.me/3dui-class-f20) course by Blair MacIntyre.
