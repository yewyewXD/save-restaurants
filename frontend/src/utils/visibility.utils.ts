import { useState, useEffect ,MutableRefObject} from "react";

export default function VisibilitySensor(ref:MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}

export function useOnVisible(ref:MutableRefObject<any>) {
  return VisibilitySensor(ref);
}
