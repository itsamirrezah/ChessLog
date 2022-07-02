import styled from "styled-components";
import { css } from "styled-components";

export const Form = styled.form`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  width: ${({ width }) => (width ? `${width}rem` : "27rem")};
  text-align: center;
  /* gap: 1.2rem; */
  gap: ${({ gap }) => (gap ? `${gap}rem` : "1.2rem")};
  margin-bottom: 2.8rem;

  & > label,
  p {
    font-size: 1.3rem;
    color: ${({ isError }) =>
      isError ? "rgb(201, 74, 74)" : "rgba(41, 41, 41)"};
    line-height: 2rem;
  }

  & > textarea {
    resize: none;
  }

  & > input,
  & > textarea {
    width: 100%;
    text-align: center;
    outline: none;
    border: none;
    border-bottom: 1px solid
      ${({ isError }) => (isError ? "rgb(201, 74, 74)" : "rgb(168, 168, 168)")};
    padding: 1px 2px;
    line-height: 2.4rem;
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
  }

  & > small {
    font-size: 10px;
  }
  ${({ align }) => align && aligns[align]}
`;

const leftAlign = css`
  align-items: flex-start;

  & > input,
  & > textarea {
    text-align: left;
  }
`;

const aligns = { left: leftAlign };
