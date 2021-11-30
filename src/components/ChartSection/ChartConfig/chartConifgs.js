import { options } from "./options";

export const chartCofig1 = {
  type: "line",

  options: {
    ...options,
  },
};
export const chartCofig2 = {
  type: "line",

  options: {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },
    animation: {
      duration: 500,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x2: {
        type: "time",
      },
    },
  },
};
