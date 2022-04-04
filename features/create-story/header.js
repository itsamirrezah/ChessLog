import { useRef, useEffect } from "react";
import Container from "./styled/header";
import AspectImage from "../../components/shared/image/aspect-image";
import useFocus from "../../lib/hooks/use-focus";
import useUploadImage from "../../lib/services/upload-image";

const keyboardActions = [13, 38, 40];

export default function Header({ content, isFocus, index, dispatch }) {
  const inputRef = useRef();
  const { ref: focusRef } = useFocus(isFocus);
  const { mutate, localFile, isSuccess, isLoading, data } = useUploadImage();

  function onSelectedHandler(e) {
    const file = e.target.files.item(0);
    mutate(file);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "CHANGE", payload: { value: data.imgUrl, index } });
    }
  }, [isSuccess]);

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onSelectedHandler}
      />
      <Container
        style={{ filter: isLoading ? "blur(5px)" : "blur(0px)" }}
        ref={focusRef}
        onClick={() =>
          isFocus
            ? inputRef.current.click()
            : dispatch({ type: "FOCUS", payload: { index } })
        }
        onKeyDown={(e) => {
          if (!keyboardActions.includes(e.keyCode)) return;
          dispatch({ type: "KEY_PRESS", payload: { key: e.keyCode } });
        }}
        tabIndex={0}
      >
        <AspectImage
          src={
            (localFile && URL.createObjectURL(localFile)) ||
            content ||
            "/cover.jpg"
          }
        />
      </Container>
    </>
  );
}
