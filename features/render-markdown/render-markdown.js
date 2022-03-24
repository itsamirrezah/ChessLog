import ReactMarkdown from "react-markdown";
import Container from "./styled/container";

export default function RenderMarkDown({ children }) {
  return (
    <Container>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Container>
  );
}
