// import useStory from "../../lib/services/story";
import useCreateStory from "./context/new-story-context";
import Title from "./title";
import Header from "./header";
import Md from "./md";

export default function CreateStory({ story }) {
  const { story: postStory } = useCreateStory(story);

  return (
    <>
      {postStory?.content &&
        postStory.content.map((p, i) => {
          const props = {
            isFocus: postStory.focus === i,
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
