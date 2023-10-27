import { Requests } from "./api";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import "./App.css";
import { FirstPage } from "./Pages/First Page/FirstPage";
import { UserMainPage } from "./Pages/main/UserMainPage";

type User = {
  email: string;
  fullName?: string;
  password?: string;
  id?: string;
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storedUserString = localStorage.getItem("User");
  const [userLogged, setUserLogged] = useState(
    storedUserString ? JSON.parse(storedUserString) : null
  );

  useEffect(() => {
    if (storedUserString) {
      const storedUser: User = JSON.parse(storedUserString);
      setUserLogged(storedUser);
    }
  }, []);

  const withLoading =
    (func) =>
    async (...args) => {
      setIsLoading(true);
      try {
        await func(...args);
      } finally {
        setIsLoading(false);
      }
    };

  const handleCreateUser = withLoading(async (newUser: User) => {
    const sameEmail = await Requests.checkSameEmail(newUser);
    if (!sameEmail) {
      await Requests.createUser(newUser);
    }
  });

  const handleLogin = withLoading(async ({ email, password }: User) => {
    const user = await Requests.logInUser({ email, password });
    if (user) {
      setUserLogged(user);
      localStorage.setItem("User", JSON.stringify(user));
    }
  });

  return (
    <>
      <Toaster />

      <FirstPage
        isLogged={storedUserString}
        handleLogin={handleLogin}
        handleCreateUser={handleCreateUser}
        isLoading={isLoading}
      />
      {storedUserString && (
        <UserMainPage
          isLoading={isLoading}
          userLoggedIn={userLogged}
          isLogged={storedUserString}
          userSignOut={() => {
            setUserLogged(null);
          }}
        />
      )}
    </>
  );
}
