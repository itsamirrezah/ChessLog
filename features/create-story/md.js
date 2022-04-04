import useFocus from "../../lib/hooks/use-focus";
import useCreateStory from "./context/new-story-context";
import Paragraph from "./styled/paragraph";
import styled from "styled-components";
import RenderMarkDown from "../render-markdown/render-markdown";

const keyboardActions = [13, 38, 40, 8];

export default function Md({ content, isFocus, index, dispatch }) {
  const { ref: focusRef } = useFocus(isFocus);

  return (
    <Container onClick={() => dispatch({ type: "FOCUS", payload: { index } })}>
      {isFocus && (
        <Paragraph
          onFocus={() =>
            !isFocus && dispatch({ type: "FOCUS", payload: { index } })
          }
          onKeyDown={(e) => {
            if (!keyboardActions.includes(e.keyCode)) return;
            if (e.keyCode === 8 && e.target.selectionEnd === 0)
              e.preventDefault();

            dispatch({
              type: "KEY_PRESS",
              payload: {
                key: e.keyCode,
                cursorSelection: e.target.selectionEnd,
              },
            });
          }}
          onChange={(e) => {
            dispatch({ type: "CHANGE", payload: { value: e.target.value } });
          }}
          ref={focusRef}
          value={content}
        />
      )}

      {!isFocus && <RenderMarkDown>{content}</RenderMarkDown>}
    </Container>
  );
}

const Container = styled.div`
  margin: 12px 0;
  min-height: 32px;
`;
