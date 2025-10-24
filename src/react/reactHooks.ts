import { useState } from "react";



export function useSomething() {
  const [state, setState] = useState(3);
}