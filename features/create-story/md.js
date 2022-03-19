import useFocus from "../../lib/hooks/useFocus";
import useCreateStory from "./context/new-story-context";
import Paragraph from "./styled/paragraph";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const keyboardActions = [13, 38, 40, 8];

export default function Md({ content, isFocus, index }) {
  const { dispatch } = useCreateStory();
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
            dispatch({ type: "CHANGE", payload: e.target.value });
          }}
          ref={focusRef}
          value={content}
        />
      )}

      {!isFocus && <ReactMarkdown>{content}</ReactMarkdown>}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 18px;
  min-height: 32px;
`;
