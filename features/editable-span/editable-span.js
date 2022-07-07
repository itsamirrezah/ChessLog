import styled from "styled-components";
import { forwardRef } from "react";

// export default forwardRef(function Hero(_, ref) {

export default forwardRef(function EditableSpan(props, ref) {
  const { style, onChange, placeholder } = props;
  return (
    <SpanStyled
      ref={ref}
      style={{ ...style, display: "inline-block" }}
      placeholder={placeholder}
      contentEditable
      onInput={onChange}
      suppressContentEditableWarning={true}
    />
  );
});

const SpanStyled = styled.span`
  &:empty::before {
    content: "${(props) => props.placeholder}";
  }
`;
