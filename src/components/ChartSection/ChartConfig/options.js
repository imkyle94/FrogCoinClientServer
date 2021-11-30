import { scales } from "./scales";
import { zoomOptions } from "./zoomOptions";

export const options = {
  lineHeightAnnotation: {
    always: true,
    hover: true,
    lineWeight: 1.5,
  },
  plugins: {
    title: {
      display: true,
      text: "Price Chart",
    },
    zoom: {
      ...zoomOptions,
    },
  },
  animation: {
    duration: 500,
  },
  maintainAspectRatio: false, // 창크기에 따라 차트 비율 유지 할건지
  responsive: true,
  scales: {
    ...scales,
  },
};
