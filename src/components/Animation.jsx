import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { BendModifier } from "../plugins/BendModifier";
import "../css/Animation.scss";

export default class Animation extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let canvas = document.querySelector("canvas");
        // Images:
        let { EarthTexture, SpaceTexture, NormalEarthTexture } =
            this.props.images;
        // CREATING A SCENE.
        let scene = new THREE.Scene();
        // CREATING A CAMERA.
        let camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        // MAIN TEXT. EDIT THIS AND SEE DIFFERENT RESULTS.
        let welcomeText = `We Stepped On Another Year :) Happy New Year ${
            new Date().getFullYear() + 1
        }`;
        let textArray = welcomeText.split(" "); // CREATING A ARRAY OF @param welcomeText.
        textArray = textArray.reverse(); // REVERSING THE textArray FOR CORRECT RESULT.
        camera.position.z = 200 * textArray.length + 45 * 2; // SETTING CAMERA TO A FAR POSITION. THIS WILL DECREASE AND CREATE THE ANIMATION
        camera.position.y = 5; // PLACING THE CAMERA TO A TOP POSITION
        scene.background = new THREE.TextureLoader().load(SpaceTexture); // BACKGROUND ADDING
        // CREATING THE RENDERER. AND ADDING REQUIRED PARAMETERS
        let renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        // FOR CONTROLLING THE SCENE. NEEDED FOR DEBUGGING
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enabled = false;
        controls.zoomSpeed = 0.5;
        controls.keys = {
            LEFT: 37, //left arrow
            UP: 38, // up arrow
            RIGHT: 39, // right arrow
            BOTTOM: 40, // down arrow
        };
        // controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;
        // BEND MODIFIER. THIS WILL BE THE CAUSE OF THE BENDED SPINNING TEXT.
        let Modifier = new BendModifier();
        // SOME ESSENTIAL VARIABLES.
        let geometry, material, textMesh, textGroup;
        /**
         * Generates a single stars
         */
        function generateStars() {
            // STARS ARE SPHERES.
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 24, 24),
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                })
            );
            // SETTING x, y, z POSITIONS.
            const [x, y] = Array(2)
                .fill()
                .map(() => THREE.MathUtils.randFloatSpread(100));
            const z = THREE.MathUtils.randFloat(
                -45,
                textArray.length * 200 + 45
            );
            sphere.position.set(x, y, z);
            scene.add(sphere);
        }
        // CREATING 1000 STARS INTO THE SCENE. WE ARE NOT CHANGING IT SO WE CREATED STARS THIS WAY.
        Array(1000).fill().forEach(generateStars);
        /**
         * This will draw the texts.
         * @param {Array} textArray : an array.
         */
        function DrawText(textArray) {
            for (let i = 0; i < textArray.length; i++) {
                const text = textArray[i]; // GETTING INDIVIDUAL text FROM textArray
                const loader = new THREE.FontLoader();
                loader.load(
                    "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/fonts/droid/droid_serif_bold.typeface.json",
                    (font) => {
                        geometry = new THREE.TextGeometry(text, {
                            font: font,
                            size: window.innerWidth / 180,
                            height: 6.7,
                            curveSegments: 40,
                            bevelEnabled: true,
                            bevelThickness: 3,
                            bevelSize: 3,
                            bevelOffset: 0,
                            bevelSegments: 2,
                        });
                        geometry.center();
                        material = new THREE.MeshNormalMaterial();
                        textMesh = new THREE.Mesh(geometry, material);
                        textMesh.position.z = (i + 1) * 200; // Z POSITION * 200.
                        scene.add(textMesh);
                    }
                );
            }
        }
        DrawText(textArray);
        // CREATING A STAR. ADDING map and normalMap.
        let earth = new THREE.Mesh(
            new THREE.SphereGeometry(15, 64, 64),
            new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load(EarthTexture),
                normalMap: new THREE.TextureLoader().load(NormalEarthTexture),
            })
        );
        scene.add(earth);
        // MeshStandardMaterial WILL NOT WORK WITHOUT LIGHT.
        let dirLight;
        // SETTING AMBIENT LIGHT IN FRONT OF THE CAMERA AND BACKSIDE THE CAMERA.
        dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 0, 1).normalize();
        scene.add(dirLight);
        dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 0, -1).normalize();
        scene.add(dirLight);
        // CREATING ROTATING TEXTS.
        const loader1 = new THREE.FontLoader();
        loader1.load(
            "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/fonts/droid/droid_serif_bold.typeface.json",
            (font) => {
                let geometry1 = new THREE.TextGeometry("Happy New Year 2022!", {
                    font: font,
                    size: 3,
                    height: 1,
                    curveSegments: 40,
                    bevelEnabled: true,
                    bevelThickness: 0.6,
                    bevelSize: 0.5,
                    bevelOffset: 0,
                    bevelSegments: 8,
                });
                let geometry2 = new THREE.TextGeometry(
                    "From Shuvro",
                    {
                        font: font,
                        size: 3,
                        height: 1,
                        curveSegments: 40,
                        bevelEnabled: true,
                        bevelThickness: 0.6,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 8,
                    }
                );
                geometry1.center();
                geometry2.center();
                let material1 = new THREE.MeshNormalMaterial();
                let textMesh1 = new THREE.Mesh(geometry1, material1); // TEXT 1
                textMesh1.position.z = 30;
                let direction = new THREE.Vector3(0, 0, -1);
                let axis = new THREE.Vector3(0, 1, 0);
                let angle = Math.PI / 4;
                let textMesh2 = new THREE.Mesh(geometry2, material1); // TEXT 2
                textMesh2.position.z = -30;
                textMesh2.rotation.y = Math.PI;
                Modifier.set(direction, axis, angle).modify(geometry1); // CAUSES THE BEND.
                Modifier.set(direction, axis, angle).modify(geometry2); // CAUSES THE BEND.
                // CREATING A GROUP OF THESE TEXTS.
                let textGroup = new THREE.Group();
                textGroup.add(textMesh1);
                textGroup.add(textMesh2);
                scene.add(textGroup);
                function spin() {
                    requestAnimationFrame(spin);
                    textGroup.rotation.y -= 0.005; // SPINNING THE WHOLE textGroup.
                }
                spin();
            }
        );
        // Debug
        // let gridHelper = new THREE.GridHelper(400, 20);
        // scene.add(gridHelper);
        // GIVES THE FRAME RATE.
        let stats = new Stats();
        document.body.appendChild(stats.dom);
        // let gui = new GUI();
        // gui.add(params, "range").min(-100).max(100).name("Controls");
        // for (const i in gui.__controllers) {
        //     const element = gui.__controllers[i];
        //     element.updateDisplay();
        // }
        let timer = 0,
            completed = false;
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
            earth.rotation.y += 0.005;
            stats.update();
            camera.position.y = 5;
            // IF EFFECT IS NOT COMPLETED...
            if (!completed) {
                if (timer > 120) {
                    // IF TIMER IS GREATER THAN 121 (DEFAULT IS 0)
                    if (camera.position.z > 48) {
                        // IF camera'S Z COORDINATE IS GREATER THAN 48 (DEFAULT IS 200 * textArray.length + 45 * 2)
                        if (!completed) {
                            // IF EFFECT IS NOT COMPLETED
                            camera.position.z -= 3;
                        }
                    } else {
                        // IF camera'S Z COORDINATE IS NOT GREATER THAN 48
                        camera.position.z = 45; // SET IT TO 45
                        controls.enabled = true; // ENABLE THE USER CONTROL
                        completed = true; // MAKE THE completed TO true
                    }
                } else {
                    // IF timer IS NOT GREATER THAN 121
                    timer++;
                }
            }
        }
        animate();
        // RESPONSIVE.
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.updateProjectionMatrix();
        });
    }
    render() {
        return (
            <>
                <canvas></canvas>
            </>
        );
    }
}
