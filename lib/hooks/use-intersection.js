import { useState, useEffect, useRef } from "react";

export default function useIntersection(threshold) {
  const ref = useRef();

  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!window || !ref.current) return;

    function callback([entry]) {
      setIntersecting(entry.isIntersecting);
    }
    const observer = new IntersectionObserver(callback, {
      threshold,
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });

  return { ref, isIntersecting };
}
