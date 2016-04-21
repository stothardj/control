// This can be made more complicated later to handle things like IE
define({
  isLeftMouseButton: ev => ev.button == 0,
  isMiddleMouseButton: ev => ev.button == 1,
  isRightMouseButton: ev => ev.button == 2,
});

