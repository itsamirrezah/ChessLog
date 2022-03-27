import axios from "axios";
import { useState } from "react";

export default function useUpdateSession() {
  const [updatedSession, setUpdatedSession] = useState(null);
  const [status, setStatus] = useState(undefined);

  async function mutate() {
    setStatus(statuses.loading);
    const session = await axios
      .get("/api/auth/session?update=true")
      .then((res) => res.data);
    setStatus(statuses.success);
    setUpdatedSession(session);
  }

  return {
    isLoading: status === statuses.loading,
    isSuccess: status === statuses.success,
    data: updatedSession,
    mutate,
  };
}

const statuses = Object.freeze({ loading: "loading", success: "success" });
