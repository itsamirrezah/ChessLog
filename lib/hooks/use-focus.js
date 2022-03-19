import { useEffect, useRef } from "react";

export default function useFocus(isFocus) {
  const ref = useRef();

  useEffect(() => {
    if (isFocus) ref.current.focus();
  }, [isFocus]);

  return { ref };
}
