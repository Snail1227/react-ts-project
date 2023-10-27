import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

type UserCredentials = {
  email: string;
  password: string;
  fullName?: string;
};

type FirstPageProps = {
  isLogged: boolean;
  showSignUp: boolean; 
  handleLogin: (credentials: UserCredentials) => Promise<void>;
  handleCreateUser: (credentials: UserCredentials) => Promise<void>;
  handleChangeForm: () => void;
  isLoading: boolean;
};

export function FirstPage({
  isLogged,
  handleLogin,
  handleCreateUser,
  isLoading
}: FirstPageProps) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChangeForm = () => {
    setShowSignUp(prevState => !prevState);
  };
  const changeButtonText = showSignUp
    ? "Change to Sign In"
    : "Change to Sign Up";

  return (
    <div className="form">
      <div>
        {showSignUp ? (
          <SignUp handleCreateUser={handleCreateUser} isLoading={isLoading} />
        ) : (
          !isLogged && <SignIn onSignIn={handleLogin} isLoading={isLoading} />
        )}
      </div>
      {!isLogged && (
        <button 
          className="logIn-signUp" 
          onClick={handleChangeForm}>
          {changeButtonText}
        </button>
      )}
    </div>
  );
}

