import Container from "./styled/item-container";
import Info from "../../components/shared/stories/info";
import H2 from "./styled/h2";
import Link from "next/link";
import H4 from "./styled/h4";
import Avatar from "../../components/shared/avatar/avatar";
import Author from "./styled/author";

export default function Item({ item }) {
  return (
    <Container>
      <Author>
        <Avatar size={20} src="/cover.jpg" alt="alt" />
        <H4>{item.author.name}</H4>
      </Author>
      <Link href={"/test"}>
        <a>
          <H2>{item.title}</H2>
          <Info />
        </a>
      </Link>
    </Container>
  );
}
