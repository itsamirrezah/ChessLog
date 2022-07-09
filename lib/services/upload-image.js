import axios from "axios";
import { useMutation } from "react-query";

export default function useUploadImage(path) {
  return useMutation((file) => {
    const fd = new FormData();
    fd.append("image", file);
    fd.append("path", path);
    return axios({
      method: "POST",
      url: "/api/upload/photo",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => res.data);
  });
}
