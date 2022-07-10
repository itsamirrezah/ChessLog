import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import useUpdateStory from "../../../lib/services/update-story";
import reducer from "./reducer";
import { useRouter } from "next/router";

const NewStoryContext = createContext();

export function NewStoryProvider({ children }) {
  const [story, dispatch] = useReducer(reducer, null);
  const { mutate, isLoading, isSuccess, data } = useUpdateStory(story?._id);
  const router = useRouter();

  function onPublishHandler(excerpt, tags) {
    const remoteStory = {
      title: story.title,
      header: story.content.find((it) => it.type === "header")?.content || null,
      content: story.content,
      published: true,
      author: story.author,
      authorId: story.authorId,
      excerpt,
      tags,
    };

    mutate({ story: remoteStory });
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("published successfully");
      router.replace("/");
    }
  }, [isSuccess]);

  const enabled =
    story && story.title && story.content.length > 3 ? true : false;
  return (
    <NewStoryContext.Provider
      value={{ story, enabled, dispatch, onPublishHandler }}
    >
      {children}
    </NewStoryContext.Provider>
  );
}

export default function useCreateStory(story) {
  const ctx = useContext(NewStoryContext);

  useEffect(() => {
    if (!story) return;
    ctx.dispatch({ type: "LOAD_STORY", payload: { story } });
  }, []);

  return ctx;
}
