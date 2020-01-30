function setNormalIntensive(model, light, I, K){
  
  for (let i = 0; i < model.length; i++) {
    model[i].intensive = [];
    for (let j=0; j<model[i].vertex.length; j++){
      let lightV = { x: -model[i].vertex[j].x + light.x, y: -model[i].vertex[j].y + light.y, z: -model[i].vertex[j].z + light.z };
      let angle = (lightV.x + lightV.y +lightV.z) / (Math.sqrt(lightV.x*lightV.x + lightV.y*lightV.y + lightV.z*lightV.z)*(Math.sqrt(3)));
      if (!angle) angle = 0;
      
      model[i].intensive.push(I*K*angle);
    }
  }
}

const draw = (model, graphical, startDegX, startDegY) => {
    setNormalIntensive(model, graphical.light, graphical.I, graphical.K);
    console.log(model);
    
    graphical.clear();
    const dt = Date.now();
    graphical.setRotateX(startDegX);
    graphical.setRotateY(startDegY);

    for (let i = 0; i < model.length; i++) {
      graphical.setColor(model[i].fill);

      graphical.fill(
        { from: model[i].vertex[0], to: model[i].vertex[1] },
        { from: model[i].vertex[3], to: model[i].vertex[2] },
        model[i].normal,
        model[i].intensive
      );
    }
    console.log(`Время отрисовки ${Date.now() - dt} мс`);
  }

  export {draw};