import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const NewStoryContext = createContext();

const sampleState = {
  id: "",
  focus: 0,
  title: "Test",
  header: "",

  content: [
    {
      type: "title",
      content: "Test",
    },
    {
      type: "header",
      content: "",
    },
    {
      type: "md",
      content: "Test",
    },
  ],
};

export function NewStoryProvider({ children }) {
  const [story, dispatch] = useReducer(reducer, sampleState);

  return (
    <NewStoryContext.Provider value={{ story, dispatch }}>
      {children}
    </NewStoryContext.Provider>
  );
}

export default function useCreateStory() {
  return useContext(NewStoryContext);
}
