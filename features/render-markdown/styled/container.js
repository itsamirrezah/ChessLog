import styled from "styled-components";
export default styled.div`
  padding-top: 24px;
  color: rgb(41, 41, 41);

  & > * {
    padding: 20px 0;
  }

  & > h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
  }

  & > h2 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }

  & > p {
    line-height: 32px;
    font-size: 20px;
  }
`;
