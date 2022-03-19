import useCreateStory from "./context/new-story-context";
import Title from "./title";
import Header from "./header";
import Md from "./md";

export default function CreateStory() {
  const { story } = useCreateStory();

  return (
    <>
      {story.content.map((p, i) => {
        const props = { isFocus: story.focus === i, index: i };

        if (p.type === "title") return <Title content={p.content} {...props} />;
        else if (p.type === "header")
          return <Header content={p.content} {...props} />;
        else return <Md key={i} content={p.content} {...props} />;
      })}
    </>
  );
}
