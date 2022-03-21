import { Studio } from "./Studio";
import * as Dat from "dat.gui";
import * as THREE from "three";

const main = (args?: ["string"]) => {
  console.time("Setup");

  const clock = new THREE.Clock();

  const studio = new Studio(".webgl");
  studio.addOrbitControls();

  // add axix helper
  const axesHelper = new THREE.AxesHelper(5);
  studio.scene.add(axesHelper);

  const gui = new Dat.GUI();
  axesHelper.visible = false;
  gui.add(axesHelper, "visible").name("Axis");

  console.timeEnd("Setup");

  const Render = () => {
    const elapsedTime = clock.getElapsedTime();

    studio.Render(elapsedTime);

    window.requestAnimationFrame(Render);
  };
  Render();
};

main();
