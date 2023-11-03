import { useState, useRef, useEffect } from "react";
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
  const formRef = useRef<HTMLDivElement>(null);

  const handleChangeForm = () => {
    if (formRef.current) {
      formRef.current.classList.add('flip-exit');
      setTimeout(() => {
        setShowSignUp((prevState) => !prevState);
        formRef.current?.classList.remove('flip-exit');
        formRef.current?.classList.add('flip-enter');
      }, 500);
    }
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add('flip-enter');
      const timeoutId = setTimeout(() => {
        formRef.current?.classList.remove('flip-enter');
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [showSignUp]);

  return (
    <div className="form">
      <div className="form-container" ref={formRef}>
        {!userLogged && (
          <button className="logIn-signUp" onClick={handleChangeForm}>
            {showSignUp ? 'Change to Sign In' : 'Change to Sign Up'}
          </button>
        )}
        {!userLogged && (showSignUp ? (
          <SignUp handleCreateUser={handleCreateUser} isLoading={isLoading} />
        ) : (
          <SignIn onSignIn={handleLogin} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
}