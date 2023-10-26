import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export function FirstPage({
  isLogged,
  showSignUp,
  handleLogin,
  handleCreateUser,
  handleChangeForm,
}) {

  const changeButtonText = showSignUp
    ? "Change to Sign In"
    : "Change to Sign Up";
    
  return (
    <div className="form">
      <div >
        {showSignUp ? (
          <SignUp handleCreateUser={handleCreateUser} />
        ) : (
          !isLogged && <SignIn onSignIn={handleLogin} />
        )}
      </div>
      {!isLogged && (
        <button className="logIn-signUp" onClick={handleChangeForm}>
          {changeButtonText}
        </button>
      )}
    </div>
  );
}
