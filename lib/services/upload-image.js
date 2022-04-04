import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";

export default function useUploadImage() {
  const [localFile, setLocalFile] = useState(null);

  const mutation = useMutation((file) => {
    const fd = new FormData();
    fd.append("image", file);
    return axios({
      method: "POST",
      url: "/api/upload/photo",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => res.data);
  });

  function mutate(file) {
    setLocalFile(file);
  }

  useEffect(() => {
    if (!localFile) return;
    const timer = setTimeout(() => {
      mutation.mutate(localFile);
    }, 2000);

    return () => clearTimeout(timer);
  }, [localFile]);

  return { ...mutation, localFile, mutate };
}
