define(['./layer'], function(layer) {
  let Layer = layer.Layer;
  return {
    pause: new Layer('pause'),
    game: new Layer('game'),
    mouse: new Layer('mouse'),
  };
});
