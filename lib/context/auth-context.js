import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import useCreateUser from "../services/create-user";
import { signIn as nextSignIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthProvider() {
  const { data, status } = useSession();
  const router = useRouter();
  const {
    isSuccess,
    isError,
    error: createUserError,
    mutate,
    variables,
  } = useCreateUser();
  const [isModalShown, setModalShown] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      const { email, password } = variables;
      signIn(email, password);
    }
    setLoading(false);
    setError(createUserError);
  }, [isSuccess, isError, createUserError]);

  async function signIn(email, password) {
    setLoading(true);
    const signInResult = await nextSignIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (signInResult.error) {
      //handle error
      setError(signInResult.error);
      setLoading(false);
    } else {
      router.reload();
    }
  }

  async function signUp(email, password) {
    setLoading(true);
    await mutate({ email, password });
  }

  function showModal() {
    setModalShown(true);
  }

  function hideModal() {
    setModalShown(false);
  }

  return {
    user: status === "authenticated" ? data.user : null,
    isAuth: status === "authenticated",
    isSessionLoading: status === "loading",
    status,
    signIn,
    signUp,
    error,
    showModal,
    hideModal,
    isModalShown,
    isLoading,
    signOut,
  };
}

export default function useAuth() {
  return useContext(AuthContext);
}
