import { createContext, useContext, useEffect, useState } from "react";
import useCreatePost from "../components/hooks/useCreatePost";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NewPostContext = createContext({
  post: {},
});

const initialPost = {
  id: "",
  title: "",
  content: "",
  image: null,
  imageSrc: "",
};

export function NewPostProvider({ children }) {
  const [post, setPost] = useState(initialPost);
  const router = useRouter();
  const { mutate, isError, isSuccess, isLoading, data } = useCreatePost();
  const { data: user, status: session } = useSession();

  async function publish() {
    if (session === "loading") return;
    const formData = new FormData();
    formData.append("id", post.id);
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("image", post.image);
    if (!post.id)
      formData.append("author", JSON.stringify({ email: user.user.email }));
    mutate(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      router.replace(data?.postLink || "/posts");
    }
  }, [isSuccess]);

  return (
    <NewPostContext.Provider value={{ post, setPost, publish }}>
      {children}
    </NewPostContext.Provider>
  );
}

export default function useNewPost() {
  const ctx = useContext(NewPostContext);
  return ctx;
}
