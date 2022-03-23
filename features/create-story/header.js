import { useRef } from "react";
import Container from "./styled/header";
import AspectImage from "../../components/shared/image/aspect-image";
import useCreateStory from "./context/new-story-context";
import useFocus from "../../lib/hooks/use-focus";

const keyboardActions = [13, 38, 40];

export default function Header({ content, onChange, isFocus, index }) {
  const inputRef = useRef();
  const { dispatch } = useCreateStory();
  const { ref: focusRef } = useFocus(isFocus);

  function onSelectedHandler(e) {
    const file = e.target.files[0];
    if (file) onChange(URL.createObjectURL(file));
  }

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onSelectedHandler}
      />
      <Container
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
        <AspectImage src={content || "/cover.jpg"} />
      </Container>
    </>
  );
}
