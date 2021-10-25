import { useEffect, useRef } from "react";

export function useDidMountEffect(func: Function, deps: any[]) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
