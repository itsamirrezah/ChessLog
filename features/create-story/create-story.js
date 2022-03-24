import useCreateStory from "./context/new-story-context";
import Title from "./title";
import Header from "./header";
import Md from "./md";

export default function CreateStory() {
  const { story } = useCreateStory();

  return (
    <>
      {story.content.map((p, i) => {
        const props = {
          isFocus: story.focus === i,
          index: i,
          content: p.content,
        };

        if (p.type === "title") return <Title {...props} />;
        else if (p.type === "header") return <Header {...props} />;
        else return <Md key={i} {...props} />;
      })}
    </>
  );
}
