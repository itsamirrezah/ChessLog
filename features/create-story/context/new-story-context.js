import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import reducer from "./reducer";

const NewStoryContext = createContext();

export function NewStoryProvider({ children }) {
  const [story, dispatch] = useReducer(reducer, null);

  return (
    <NewStoryContext.Provider value={{ story, dispatch }}>
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
