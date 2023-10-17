import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Requests } from "./api";
import { Toaster, toast } from "react-hot-toast"
import { useState } from "react";
import './App.css'

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChangeForm = () => {
    setShowSignUp(prevState => !prevState);
};

  const handleCreateUser = (newUser) => {
    Requests.createUser(newUser)
    .then(() => {
      toast.success(`Created ${newUser.fullName}`);
    })
    .catch(() => {
      toast.error("Error creating a user.");
    });
  }

  const changeButtonText = showSignUp ? "Change to Sign In" : "Change to Sign Up";

  return (
    <>
      <Toaster/>
      {showSignUp ? 
        <SignUp
        handleCreateUser={handleCreateUser}
      /> :
      <SignIn 
      />
      }
      <button onClick={handleChangeForm}>
        {changeButtonText}
      </button>
    </>
  )
}
