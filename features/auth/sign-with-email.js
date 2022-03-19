import ContinueButton from "./styled/continue-button";
import Header from "./styled/header";
import ReturnButton from "./styled/return-button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "./styled/email-form";
import Alert from "./styled/alert";

export default function SignWithEmail({
  onBack,
  sign,
  onNext,
  isLoading,
  error,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPasswordShown, setPasswordShown] = useState(false);

  function onContinue({ email, password }) {
    if (!isPasswordShown) setPasswordShown(true);
    else onNext(email, password);
  }
  return (
    <>
      <Header>Sign {`${sign}`} with email</Header>
      <Form>
        {!isPasswordShown && (
          <FormControl isError={errors?.email}>
            <label htmlFor="email">Enter your email here: </label>
            <input
              {...register("email", {
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              placeholder="email@example.com"
            />
            <Alert role="alert">{errors?.email && errors.email.message}</Alert>
          </FormControl>
        )}

        {isPasswordShown && (
          <FormControl isError={errors?.password}>
            <label htmlFor="password">Your password: </label>
            <input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters",
                },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    "Your password must contain lowercase letters, uppercase letters and numbers",
                },
              })}
              id="password"
              type="password"
            />
            <Alert role="alert">
              {errors?.password && errors.password.message}
            </Alert>
            {!isLoading && error && <Alert role="alert">{error}</Alert>}
          </FormControl>
        )}

        <ContinueButton onClick={handleSubmit(onContinue)} disabled={isLoading}>
          {isLoading ? `Signing ${sign}...` : "Continue"}
        </ContinueButton>
        <div>
          <ReturnButton onClick={onBack}>
            All sign {`${sign}`} options
          </ReturnButton>
        </div>
      </Form>
    </>
  );
}
