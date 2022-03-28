import Container from "./styled/container";
import { Form, FormControl } from "../../components/shared/forms/form";
import ContinueButton from "../../components/shared/buttons/continue-button";
import Header from "../../components/shared/modals/styled/header";
import Alert from "../../components/shared/forms/alert";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useValidateUsername from "../../lib/services/validate-username";
import useUpdateSession from "../../lib/services/update-session";
import useSetUsername from "../../lib/services/set-username";
import useAuth from "../../lib/context/auth-context";

export default function UsernameRequired({ hide }) {
  const { user } = useAuth();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: { username: "" } });

  const username = watch("username");

  const { data, isSuccess, isLoading, isError } = useValidateUsername(
    username,
    !errors?.username && !!username
  );

  const {
    mutate: mutateUser,
    isError: updateError,
    isLoading: updateLoading,
    isSuccess: updateSuccess,
  } = useSetUsername(user?.id);

  const {
    data: sessionData,
    isLoading: sessionLoading,
    isSuccess: sessionSuccess,
    mutate: mutateSession,
  } = useUpdateSession();

  useEffect(() => {
    if (updateSuccess) {
      mutateSession();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (sessionSuccess) {
      hide();
    }
  }, [sessionSuccess]);

  const errorMsg =
    updateError || isError
      ? "something went wrong, try again."
      : isSuccess && !data.available
      ? data.message
      : errors?.username
      ? errors.username.message
      : "";

  return (
    <Container>
      <Form>
        <Header>Pick a username</Header>
        <FormControl>
          <label htmlFor="username">Your desire username:</label>
          <input
            {...register("username", {
              minLength: {
                value: 3,
                message: "username must contain at least 3 characters",
              },
              maxLength: {
                value: 16,
                message: "username must be less than 16 characters ",
              },
              pattern: {
                value: /^(?![_.])[a-zA-Z0-9_.]+$/i,
                message:
                  "username must start with letters and should contain characters, numbers, underscore or dot",
              },
              required: true,
            })}
            id="username"
            placeholder="Your username"
            autoComplete="off"
          />
          {errorMsg && <Alert>{errorMsg}</Alert>}
          {isLoading && <Alert>checking...</Alert>}
          {isSuccess && data.available && <Alert>{data.message}</Alert>}
        </FormControl>
      </Form>
      <ContinueButton
        onClick={handleSubmit(() => mutateUser({ username }))}
        disabled={!isSuccess || (isSuccess && !data.available)}
      >
        Continue
      </ContinueButton>
    </Container>
  );
}
