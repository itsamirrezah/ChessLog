import styled from "styled-components";
import useFocus from "../../lib/hooks/use-focus";
import Paragraph from "./styled/paragraph";

const keyboardActions = [13, 38, 40];

export default function Title({ content, isFocus, index, dispatch }) {
  const { ref: focusRef } = useFocus(isFocus);

  return (
    <StyledTitle
      onClick={() => dispatch({ type: "FOCUS", payload: { index } })}
      placeholder="Title"
      onKeyDown={(e) => {
        if (!keyboardActions.includes(e.keyCode)) return;
        if (e.key === "Enter") e.preventDefault();

        dispatch({
          type: "KEY_PRESS",
          payload: { key: e.keyCode, cursorSelection: e.target.selectionEnd },
        });
      }}
      onChange={(e) =>
        dispatch({
          type: "CHANGE",
          payload: { value: { type: "title", content: e.target.value } },
        })
      }
      ref={focusRef}
      value={content}
    />
  );
}

const StyledTitle = styled(Paragraph)`
  font-size: 42px;
  margin-top: 0;
`;
