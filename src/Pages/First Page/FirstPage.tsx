import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { CreateUser, LogInUser } from "../../App";

type FirstPageProps = {
  userLogged: boolean;
  handleLogin: (credentials: LogInUser) => Promise<void>;
  handleCreateUser: (credentials: CreateUser) => Promise<void>;
  isLoading: boolean;
};

export function FirstPage({
  userLogged,
  handleLogin,
  handleCreateUser,
  isLoading,
}: FirstPageProps) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChangeForm = () => {
    setShowSignUp((prevState) => !prevState);
  };

  const changeButtonText = showSignUp
    ? "Change to Sign In"
    : "Change to Sign Up";
  console.log(!userLogged);
  return (
    <div className="form">
      <div>
        {!userLogged &&
          (showSignUp ? (
            <SignUp handleCreateUser={handleCreateUser} isLoading={isLoading} />
          ) : (
            <SignIn onSignIn={handleLogin} isLoading={isLoading} />
          ))}
      </div>
      {!userLogged && (
        <button className="logIn-signUp" onClick={handleChangeForm}>
          {changeButtonText}
        </button>
      )}
    </div>
  );
}
