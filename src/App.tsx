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
};

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('User') || '{}');
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState<User | null>(null);


  useEffect(() => {
    const refreshedPage = ((window.performance as any).navigation.type === (window.performance as any).navigation.TYPE_RELOAD);
    const zxc = localStorage.getItem('User')
    console.log(localStorage.getItem('User'))
  
    if (refreshedPage) {
      setUserLogged(zxc)
    }
    
  }, [])

  const handleChangeForm = () => {
    setShowSignUp(prevState => !prevState);
  };

  const handleCreateUser = (newUser) => {
    Requests.createUser(newUser)
  }

  const handleLogin = async ({email, password}) => {
    
    const user = await Requests.logInUser({email, password});
    console.log(user)
    if (user) {
      setIsLogged(true);
      setUserLogged(user);
      localStorage.setItem('User', JSON.stringify(user));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("User");
    setIsLogged(false);
    setUserLogged(null)
  }

  console.log(userLogged?.fullName)

  return ( 
    <>
      <Toaster/>
       
      <FirstPage 
        isLogged={isLogged}
        showSignUp={showSignUp}
        handleLogin={handleLogin}
        handleCreateUser={handleCreateUser}
        handleChangeForm={handleChangeForm}
        />
      {isLogged && 
      <UserMainPage
        userNameLoggedIn={userLogged}
        isLogged={isLogged}
        handleSignOut={handleSignOut}
       />}
    </>
  )
}
