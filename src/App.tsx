import { Requests } from "./api";
import { Toaster } from "react-hot-toast"
import { useState, useEffect } from "react";
import './App.css'
import { FirstPage } from "./Pages/First Page/FirstPage";
import { UserMainPage } from "./Pages/main/UserMainPage";

type User = {
  email: string;
  fullName?: string;
  password?: string;
  id?:string;
};

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const storedUserString = localStorage.getItem('User');
  const [userLogged, setUserLogged] = useState(
    storedUserString ? JSON.parse(storedUserString) : null
  );

  useEffect(() => {
    if (storedUserString) {
      const storedUser: User = JSON.parse(storedUserString);
      setUserLogged(storedUser)
    } 
  }, [])


  const handleChangeForm = async () => {
    await setShowSignUp(prevState => !prevState);
  };

  const handleCreateUser = async (newUser) => {
   await Requests.createUser(newUser) 
  }

  const handleLogin = async ({email, password}) => {
    const user = await Requests.logInUser({email, password});
    if (user) {
      setUserLogged(user);
      localStorage.setItem('User', JSON.stringify(user));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("User");
    setUserLogged(null)
  }
  

  return ( 
    <>
      <Toaster/>
       
      <FirstPage 
        isLogged={storedUserString}
        showSignUp={showSignUp}
        handleLogin={handleLogin}
        handleCreateUser={handleCreateUser}
        handleChangeForm={handleChangeForm}
        />
      {storedUserString && 
      <UserMainPage
        userLoggedIn={userLogged}
        isLogged={storedUserString}
        handleSignOut={handleSignOut}
       />}
    </>
  )
}
