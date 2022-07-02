import { useState } from "react";

export default function useStoryTags() {
  const [s, setS] = useState([
    "World",
    "Hello World",
    "What",
    "Typescript",
    "Javascript",
    "Kotlin",
    "Kotlin is the best",
  ]);
}
