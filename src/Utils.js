const draw = (model, graphical, startDegX, startDegY) => {
    graphical.clear();
    const dt = Date.now();
    graphical.setRotateX(startDegX);
    graphical.setRotateY(startDegY);

    for (let i = 0; i < model.length; i++) {
      graphical.setColor(model[i].fill);

      graphical.fill(
        { from: model[i].vertex[0], to: model[i].vertex[1] },
        { from: model[i].vertex[3], to: model[i].vertex[2] },
        model[i].normal
      );
    }
    console.log(`Время отрисовки ${Date.now() - dt} мс`);
  }

  export {draw};