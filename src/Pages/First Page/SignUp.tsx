import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";

type UserCredentials = {
  fullName: string;
  email: string;
  password: string;
};

type SignUpProps = {
  handleCreateUser: (credentials: UserCredentials) => Promise<void>;
  isLoading: boolean;
};

export function SignUp({ handleCreateUser, isLoading }: SignUpProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const filledData = fullName && email && password;

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filledData) {
      handleCreateUser({
        fullName: fullName,
        email: email,
        password: password,
      })
        .then(() => {
          toast.success(`${fullName} created successfully`);
          handleReset();
        })
        .catch((e: Error) => {
          toast.error(e.message);
        });
    }
  };

  return (
    <>
      <form className="logInForm" action="" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="text"
          value={fullName}
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </form>
    </>
  );
}
