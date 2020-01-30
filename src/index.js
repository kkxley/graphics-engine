import Cube from './models/Cube';
import Graphical from './Graphical.ts';
import Jquery from 'jquery';

import { draw } from './Utils';

let startDegY = 0,
  startDegX = 0;

let posY = 100,
  posX = 100;
Jquery(() => {
  const graphical = new Graphical(Jquery('#canvas')[0].getContext('2d'));  
  graphical.setPosition(posX, posY);
  Jquery('.input-config').change(e => {
    const name = e.target.name;

    switch (name) {
      case 'degX':
        startDegX = parseInt(e.target.value);
        break;
      case 'degY':
        startDegY = parseInt(e.target.value);
        break;
      case 'posY':
        posY = parseInt(e.target.value);
        break;
      case 'posX':
        posX = parseInt(e.target.value);
        break;
    }
    graphical.setPosition(posX, posY);
    draw(Cube, graphical, startDegX, startDegY);
    graphical.showLight();
  });

  draw(Cube, graphical, startDegX, startDegY);
  graphical.showLight();
});
