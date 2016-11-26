define([
  './layer',
], (
  layer
) => {
  let Layer = layer.Layer;
  return {
    eventcapture: new Layer('eventcapture'),
    pause: new Layer('pause'),
    game: new Layer('game'),
    mouse: new Layer('mouse'),
  };
});
