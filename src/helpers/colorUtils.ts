import { useMemo } from "react";
import { colors } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useIsThemeDark } from "../mui/mui";

const _hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;


/**
 * Convert a HEX color code to an RGBA color string.
 *
 * @param {string} hex    HEX color code (e.g. "#ae951e" or "ae951e").
 * @param {number} [alpha=1]  Alpha value between 0 and 1 (default is 1).
 * @returns {string | null}   RGBA string (e.g. "rgba(174, 149, 30, 1)") or null if invalid.
 */
export function hexToRgba(hex: string, alpha: number = 1): string | null {
  const result = _hexRegex.exec(hex);

  if (!result) {
    return null;
  }

  if (alpha < 0 || alpha > 1) {
    alpha = 1;
  }

  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}


type IChan180Colors = {
  greenC: string;
  redC: string;
  yellowC: string;
  isDark: boolean;
  blueC: string;
  labelC: string;
  borderC: string;
};


export function useChan180Colors() {
  const {isThemeDark}= useIsThemeDark();

  const trColors = useMemo<IChan180Colors>(
    () => ({
      greenC: colors.green[isThemeDark ? 400 : 900],
      redC: colors.red[isThemeDark ? 300 : 800],
      yellowC: colors.yellow[isThemeDark ? 300 : 900],
      blueC: blue[isThemeDark ? 400 : 900],
      isDark: isThemeDark,
      labelC: isThemeDark ? "#f3fb97" : "#335a53",
      borderC: isThemeDark ? grey[500] : grey[500]
    }), [isThemeDark]
  );

  return trColors;
}

const pastelColors = [
  "#3990f2",
  "#2fc4c6",
  "#ffa8bb",
  "#b040cc",
  "#feda2d",
  "#a6ade0",
  "#ea907a",
  "#faf0af",
  "#d4b5b0",
  "#e5cfe5",
  "#588da8",
  "#d8345f",
  "#679b9b",
  "#f1935c",
  "#a7e9af",
  "#1CB54E",
  "#851372",
  "#ffee93",
  "#95b8d1",
  "#f0efeb",
  "#fb6f92"
];


export function getRandomPastelColor() {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}


export function getTwoRandomPastelColors() {
  const firstColor = getRandomPastelColor();
  let secondColor = getRandomPastelColor();

  while (secondColor === firstColor) {
    secondColor = getRandomPastelColor();
  }

  return { firstColor, secondColor };
}