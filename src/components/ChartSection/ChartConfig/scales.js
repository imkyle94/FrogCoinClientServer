export const scales = {
  x: {
    type: "time",
  },
  y: {
    type: "linear",
    display: true,
    position: "left",
  },
  y1: {
    type: "linear",
    display: true,
    position: "right",
    // grid line settings
    grid: {
      drawOnChartArea: false, // 두번째 그리드 라인 숨기기
    },
  },
};
