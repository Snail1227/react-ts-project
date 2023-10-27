import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInProps = {
  onSignIn: (credentials: SignInCredentials) => Promise<void>;
  isLoading: boolean;
};

export function SignIn({ onSignIn, isLoading }: SignInProps) {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSignIn({
      email: emailInput,
      password: passwordInput,
    })
      .then(() => {
        toast.success(`${emailInput} successfully logged In`);
        handleReset();
      })
      .catch((e: Error) => {
        toast.error(e.message);
      });
  };

  return (
    <>
      <form className="logInForm" action="" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="email"
          value={emailInput}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={passwordInput}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
    </>
  );
}
