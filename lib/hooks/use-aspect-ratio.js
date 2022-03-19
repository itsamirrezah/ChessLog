import { useEffect, useRef, useState } from "react";

export default function useHoldAspectRatio() {
  const [ratio, setRatio] = useState(0);
  const ref = useRef();
  const naturalHeight = ref.current?.naturalHeight || 0;
  const naturalWidth = ref.current?.naturalWidth || 0;

  function holdAspectRatio(nWidth, nHeight) {
    setRatio((nHeight / nWidth) * 100);
  }

  function onImageLoad(e) {
    const { naturalWidth, naturalHeight } = e.target;
    holdAspectRatio(naturalWidth, naturalHeight);
  }

  useEffect(() => {
    if (ref.current) {
      holdAspectRatio(naturalWidth, naturalHeight);
    }
  }, [naturalHeight, naturalWidth]);

  return { ref, width: naturalWidth, ratio, onImageLoad };
}
