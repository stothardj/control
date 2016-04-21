define(function() {
  let canvasmap = {
    'game' : document.getElementById('game'),
    'mouse' : document.getElementById('mouse'),
  };
  let ctxmap = {
    'game' : canvasmap['game'].getContext('2d'),
    'mouse' : canvasmap['mouse'].getContext('2d'),
  };
  return {
    canvasmap: canvasmap,
    ctxmap: ctxmap,
  };
});
