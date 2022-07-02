import styled from "styled-components";

export default function EditableSpan({ style, onChange, placeholder }) {
  return (
    <SpanStyled
      style={{ ...style, display: "inline-block" }}
      placeholder={placeholder}
      contentEditable
      onInput={onChange}
      suppressContentEditableWarning={true}
    />
  );
}

const SpanStyled = styled.span`
  &:empty::before {
    content: "${(props) => props.placeholder}";
  }
`;
