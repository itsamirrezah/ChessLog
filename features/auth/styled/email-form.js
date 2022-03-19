import styled from "styled-components";

export const Form = styled.form`
  text-align: center;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  width: 27rem;
  text-align: center;
  gap: 1.2rem;

  margin-bottom: 2.8rem;
  & > label {
    font-size: 1.3rem;
    color: ${({ isError }) =>
      isError ? "rgb(201, 74, 74)" : "rgba(41, 41, 41)"};
    line-height: 2rem;
  }

  & > input {
    border: none;
    border-bottom: 1px solid
      ${({ isError }) => (isError ? "rgb(201, 74, 74)" : "rgb(168, 168, 168)")};
    outline: none;
    text-align: center;
    padding: 1px 2px;
    line-height: 2.4rem;
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
  }

  /* & > [role="alert"] {
    color: rgb(201, 74, 74);
    line-height: 20px;
    font-size: 13px;
  } */
`;
