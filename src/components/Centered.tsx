import { forwardRef, Ref } from "react";
import { Stack, StackProps } from "@mui/material";


function CenteredComponent({ children, ...stackProps }: StackProps, ref: Ref<HTMLDivElement>) {
  return (
    <Stack
      ref={ref}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...stackProps}
    >
      {children}
    </Stack>
  );
}


export const Centered = forwardRef<HTMLDivElement, StackProps>(CenteredComponent);