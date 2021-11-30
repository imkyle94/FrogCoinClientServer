export const zoomOptions = {
  limits: {
    x: { min: "original", max: "original" },
  },
  pan: {
    enabled: true,
    mode: "x",
    modifierKey: "ctrl",
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    drag: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "x",
  },
};
