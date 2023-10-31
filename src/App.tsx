import { Requests } from "./api";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import "./App.css";
import { FirstPage } from "./Pages/First Page/FirstPage";
import { UserMainPage } from "./Pages/main/UserMainPage";

export type CreateUser = {
  email: string;
  fullName: string;
  password: string;
};

export type LogInUser = {
  email: string;
  password: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storedUserString = localStorage.getItem("User");
  const [userLogged, setUserLogged] = useState(
    storedUserString ? JSON.parse(storedUserString) : null
  );

  useEffect(() => {
    if (storedUserString) {
      const storedUser: CreateUser = JSON.parse(storedUserString);
      setUserLogged(storedUser);
    }
  }, [storedUserString]);

  const withLoading = <T,>(
    func: (arg: T) => Promise<void>
  ) =>
  async (arg: T) => {
    setIsLoading(true);
    try {
      await func(arg);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCreateUser = withLoading<CreateUser>(async (newUser) => {
    const { email } = newUser;
    const sameEmail = await Requests.checkSameEmail({ newEmail: email });
    if (!sameEmail) {
      await Requests.createUser(newUser);
    }
  });

  const handleLogin = withLoading<LogInUser>(async ({ email, password }) => {
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
        userLogged={!!userLogged}
        handleLogin={handleLogin}
        handleCreateUser={handleCreateUser}
        isLoading={isLoading}
      />
      {storedUserString && (
        <UserMainPage
          isLoading={isLoading}
          userLogged={userLogged}
          isLogged={!!storedUserString}
          userSignOut={() => {
            setUserLogged(null);
          }}
        />
      )}
    </>
  );
}
