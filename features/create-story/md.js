import useFocus from "../../lib/hooks/use-focus";
import Paragraph from "./styled/paragraph";
import styled from "styled-components";
import RenderMarkDown from "../render-markdown/render-markdown";
import Popup from "../popup/popup";
import Trigger from "../popup/trigger";
import Pop from "../popup/pop";
import NewAction from "./new-action";

const keyboardActions = [13, 38, 40, 8];

export default function Md({ content, isFocus, index, dispatch }) {
  const { ref: focusRef } = useFocus(isFocus);

  function onAddImageHandler(imageFile) {
    dispatch({ type: "ADD_IMAGE", payload: { index, value: imageFile } });
  }

  return (
    <Container onClick={() => dispatch({ type: "FOCUS", payload: { index } })}>
      {isFocus && (
        <Popup in={!content}>
          <Trigger>
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
                dispatch({
                  type: "CHANGE",
                  payload: { value: e.target.value },
                });
              }}
              ref={focusRef}
              value={content}
            />
          </Trigger>
          <Pop position="left" showAnchor={false}>
            <NewAction onAddImageHandler={onAddImageHandler} />
          </Pop>
        </Popup>
      )}

      {!isFocus && <RenderMarkDown>{content}</RenderMarkDown>}
    </Container>
  );
}

const Container = styled.div`
  margin: 12px 0;
  min-height: 32px;
`;
