define(() => {
  let setControlGroupCallbacks = [];
  let selectControlGroupCallbacks = [];
  let boundControlGroups = {};
  for (let i=0; i<10; i++) boundControlGroups[i.toString()] = i;
  let keyDown = (ev) => {
    let keyChar = String.fromCharCode(ev.keyCode);
    let controlGroup = boundControlGroups[keyChar];
    if (controlGroup) {
      if (ev.ctrlKey) {
        for (callback of setControlGroupCallbacks) {
          callback(controlGroup, ev.shiftKey);
        }
      } else {
        for (callback of selectControlGroupCallbacks) {
          callback(controlGroup, ev.shiftKey);
        }
      }
      ev.preventDefault();
    }
  };
  return {
    start: () => {
      document.addEventListener('keydown', keyDown);
    },
    onSetControlGroup: (fn) => {
      setControlGroupCallbacks.push(fn);
    },
    onSelectControlGroup: (fn) => {
      selectControlGroupCallbacks.push(fn);
    },
  };
});
