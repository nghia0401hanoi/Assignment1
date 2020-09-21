/* CSCI 5619 Assignment 1, Fall 2020
 * Author: Evan Suma Rosenberg
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4, Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

import { SpotLight } from "@babylonjs/core/Lights/spotLight"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial"
import { Texture } from "@babylonjs/core/Materials/Textures/texture"

// Required to populate the Create methods on the mesh class. 
// Without this, the bundle would be smaller,
// but the createXXX methods from mesh would not be accessible.
import {MeshBuilder} from  "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Materials/standardMaterial"

import "@babylonjs/inspector"
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { Sound } from "@babylonjs/core/Audio/sound";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { MeshParticleEmitter } from "@babylonjs/core/Particles/EmitterTypes";
/******* Add the Game class with a static CreateScene function ******/
class Game 
{ 
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene 
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new Scene(engine);

        // This creates and positions a first-person camera (non-mesh)
        var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        //var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        //light.intensity = 0.7;0

        // Our built-in 'sphere' shape.
        var venus = MeshBuilder.CreateSphere("Venus", {diameter: 10, segments: 32}, scene);
        venus.position.z = 60;

        var pokeball = MeshBuilder.CreateSphere("pokeball", {diameter: 2, segments: 32}, scene);
        
        pokeball.rotate(new Vector3(0,1,0), -Math.PI/2);  // rotate 90 deg around y-axis
        //pokeball.rotate(new Vector3(0,0,1), Math.PI);  // rotate 180 deg around z-axis

        // Move the pokeball upward 1/2 its height
        pokeball.position.y = 2;
        pokeball.position.x = -4;
        pokeball.position.z = -2;
        // Our built-in 'ground' shape.
        var size = 50;
        var ground = MeshBuilder.CreateGround("ground", {width: size, height: size}, scene);
        ground.position.x = camera.position.x; 
        ground.position.z = camera.position.z; 

        // Texture from https://www.nationsonline.org/oneworld/map/USA/california_map.htm
        var gridTexture = new Texture("textures/cali.jpg", scene);

        var groundMaterial = new StandardMaterial("groundMaterial", scene);

        groundMaterial.diffuseTexture = gridTexture;
        ground.material = groundMaterial;
        
        // Texture from https://www.roblox.com/library/98340631/Pokeball-texture
        var pokeballTexture = new Texture("textures/pokeball.png", scene);
        var pokeballMaterial = new StandardMaterial("pokeballMaterial", scene);
        pokeballMaterial.diffuseTexture = pokeballTexture;
        pokeball.material = pokeballMaterial;
        
        // Texture from https://www.solarsystemscope.com/textures/
        var venusTexture = new Texture("textures/venus.jpg", scene);
        var venusMaterial = new StandardMaterial("venusMaterial", scene);
        venusMaterial.diffuseTexture = venusTexture;
        venus.material = venusMaterial;

        // Add spotlight
        var spotLight = new SpotLight("spotLight", new Vector3(0, 15, -10), new Vector3(0, -1/2, 1/2), Math.PI/2, 10, scene);
        spotLight.diffuse = new Color3(0.7, 1.0, 0.2);
        spotLight.specular = new Color3(0.85, 0.96, 0.65);

        // Add shadow
        var shadowGen = new ShadowGenerator(1024, spotLight);
        shadowGen.addShadowCaster(pokeball);
        shadowGen.addShadowCaster(venus);

        var halo = MeshBuilder.CreateTorus("halo", {diameter: 3, thickness: 0.1, tessellation: 64}, scene);
        halo.position.y = 6;
        halo.position.x = pokeball.position.x;
        halo.position.z = pokeball.position.z;
        // Box
        var cylinder1 = MeshBuilder.CreateCylinder("cylinder1", {height: 1.5, diameter: 2}, scene);
        
        cylinder1.position.x = -4;
        cylinder1.position.z = -2;

        var cylinder2 = MeshBuilder.CreateCylinder("cylinder2", {height: 1.5, diameter: 2}, scene);
        
        cylinder2.position.x = 4;
        cylinder2.position.z = 8;
        
        shadowGen.addShadowCaster(cylinder1);
        shadowGen.addShadowCaster(cylinder2);
        // Texture from http://texturelib.com/texture/?path=/Textures/metal/base/metal_base_0075
        var cylinderTexture = new Texture("textures/metal.jpg", scene);
        var cylinderMaterial = new StandardMaterial("cylinderMaterial", scene);
        cylinderMaterial.diffuseTexture = cylinderTexture;
        cylinder1.material = cylinderMaterial;
        cylinder2.material = cylinderMaterial;

        shadowGen.usePoissonSampling = true;
        ground.receiveShadows= true;
        scene.debugLayer.show();
        var speed = 0.1;
        var gl = new GlowLayer("glow", scene);
        gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
            if (mesh.name === "halo") result.set(1,1,0,1);
            else result.set(0,0,0,0);
        }
        var countdown = 500;
    
        scene.registerBeforeRender(function() {
            if (halo.position.y <= 0) {
                halo.position.y = 6;
                if (speed < 1) speed += 0.1;
                else pokeball.position.y += 0.05;
            }
            halo.position.y -= speed;
            
            if (countdown == 0) {
                countdown = 500;
                speed = 0.1;
                if (pokeball.position.x == cylinder1.position.x) {
                    pokeball.position.x = cylinder2.position.x;  
                    pokeball.position.z = cylinder2.position.z;  
                }
                else {
                    pokeball.position.x = cylinder1.position.x;  
                    pokeball.position.z = cylinder1.position.z;  
                }
                pokeball.position.y = 2;
                
                halo.position.x = pokeball.position.x;
                halo.position.z = pokeball.position.z;
                halo.position.y = 6; 
            }
            else countdown--;
        });
        
        var fire = new ParticleSystem("fire", 2000, scene);
        // texture from https://www.pngwing.com/en/free-png-pytua
        fire.particleTexture = new Texture("textures/fire.png", scene);
        fire.color1 = new Color4(1.0, 0.3, 0.1, 1.0);
        fire.color2 = new Color4(0.8, 0.2, 0.1, 1.0);
        fire.colorDead = new Color4(0,0,0,0);
        fire.minSize = 0.1;
        fire.maxSize = 0.3;
        fire.minLifeTime = 0.3;
        fire.maxLifeTime = 1.0;
        fire.emitRate = 1000;

        // sound from https://www.soundjay.com/nature/sounds/campfire-1.mp3
        var fire_sfx = new Sound("fire", "sounds/campfire-1.wav", scene);
        fire_sfx.play();
        scene.onPointerDown = function (evt, pickResult) {
            if ((pickResult.hit) && (pickResult.pickedMesh?.name != "ground")) {
                fire.emitter = pickResult.pickedMesh;
                fire.direction1 = new Vector3(-7, 8, 3);
                fire.direction2 = new Vector3(7, 8, -3);
                fire.start();
                fire_sfx.play();
            }
            else {
                fire.stop();
                fire_sfx.stop();
            }
        }
        return scene;
    }
}
/******* End of the Game class ******/   
 

// Get the canvas element 
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true); 

// Call the createScene function
const scene = Game.CreateScene(engine, canvas);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () 
{ 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{ 
    engine.resize();
});

