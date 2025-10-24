
import { useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";


/**
 * Returns Boolean indicating whether theme mode is dark.
 */
export function useIsThemeDark() {
  const theme = useTheme();

  return {
    isThemeDark: theme.palette.mode === 'dark'
  };
}



export function useWidth() {
  const theme = useTheme();
  const keys = useMemo(() => [...theme.breakpoints.keys], []);


  return keys.reduce((prev, curr) => {
    const match = useMediaQuery(theme.breakpoints.up(curr));
    return match ? curr : prev;
  }, "xs");
}



export function useIsMUIMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}



export function useAdminScrollbar() {
  const isMobile = useIsMUIMobile();
  const className = isMobile ? "" : "adminscrollbar";

  return className;
}