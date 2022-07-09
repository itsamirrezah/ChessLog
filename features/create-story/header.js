import { useRef, useEffect } from "react";
import Container from "./styled/header";
import AspectImage from "../../components/shared/image/aspect-image";
import useFocus from "../../lib/hooks/use-focus";
import useUploadImage from "../../lib/services/upload-image";
import Input from "../../components/shared/input/input";

const keyboardActions = [13, 38, 40];

export default function Header({ content, isFocus, index, dispatch, storyId }) {
  const inputRef = useRef();
  const { ref: focusRef } = useFocus(isFocus);
  const { mutate, isSuccess, isLoading, data } = useUploadImage(
    `/stories/${storyId}`
  );

  function onSelectedHandler(e) {
    const file = e.target.files.item(0);
    mutate(file);
  }

  useEffect(() => {
    if (typeof content === "string") return;
    mutate(content);
  }, [content]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "CHANGE", payload: { value: data.imgUrl, index } });
    }
  }, [isSuccess]);

  return (
    <Input inputRef={inputRef} onChange={onSelectedHandler}>
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
            (content &&
              typeof content !== "string" &&
              URL.createObjectURL(content)) ||
            content
          }
        />
      </Container>
    </Input>
  );
}
