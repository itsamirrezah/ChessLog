import styled, { css } from "styled-components";

const Flex = css`
  flex-grow: 1;
`;

export default styled.div`
  ${({ variant }) => variants[variant] || Flex}
`;

const variants = { flex: Flex };
