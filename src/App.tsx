import { Requests } from "./api";
import { Toaster, toast } from "react-hot-toast"
import { useState } from "react";
import './App.css'
import { FirstPage } from "./Pages/First Page/FirstPage";

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

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

  const handleLogin = async ({email, password}) => {
    const user = await Requests.logInUser(email);
    console.log({ user })

    if(user.password !== password) {
      throw new Error("Invalid Password")
    }

    setIsLogged(true);
    setUserLogged(user);
    localStorage.setItem('authToken', user.id);
  //   try {
      
  //     console.log(user)
  //     if (user && user.password === password) {  // Please note: Checking password like this isn't secure. 
  //                                                 // This is just for demonstration based on your structure.
  //         setIsLogged(true);
  //         setUserLogged(user);
  //         localStorage.setItem('authToken', user.id);  // Assuming user object has an 'id' property.
  //     } else if (user && user.password !== password) {
  //         toast.error("Password is incorrect");
  //     } else {
  //         toast.error(`${email} not found`);
  //     }
  // } catch (error) {
  //     console.error("Login failed:", error);
  //     toast.error("Login error");
  // }

  };

  function handleSignOut() {
    localStorage.removeItem("authToken");
    setIsLogged(false);
    setUserLogged(null)
}

console.log(userLogged);

  return ( 
    <>
      <Toaster/>
      {isLogged && <button onClick={handleSignOut}>Sign Out</button> } 
      <FirstPage 
        isLogged={isLogged}
        showSignUp={showSignUp}
        handleLogin={handleLogin}
        handleCreateUser={handleCreateUser}
        handleChangeForm={handleChangeForm}
        />
      
    </>
  )
}
