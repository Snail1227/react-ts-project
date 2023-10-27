import { Requests } from "../../api";
import { Games } from "./Games";
import { useState, useEffect } from "react";

type Game = {
  id: number;
  name: string;
  image: string;
  releaseDate: string;
  developer: string;
};

type User = {
  id: number;
  fullName: string;
};

type UserMainPageProps = {
  userLoggedIn: User;
  isLogged: string;
  userSignOut: (user?: any) => void;
  isLoading: boolean;
};

export function UserMainPage({
  userLoggedIn,
  isLogged,
  userSignOut,
  isLoading,
}: UserMainPageProps) {
  const userId = userLoggedIn?.id;
  const userName = userLoggedIn?.fullName;
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [isCartActive, setIsCartActive] = useState(false);

  useEffect(() => {
    Requests.showGames().then(setAllGames); // to set state all games
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("User");
    userSignOut();
  };

  return (
    <div className="container">
      <div className="top">
        <div className="welcome-top">
          <div>Welcome, {userName} !</div>
          <img
            className={`online-shopping ${isCartActive ? "active-cart" : ""}`}
            src="src\Pictures\online-shopping.png"
            alt="online-shopping"
            onClick={() => {
              setIsCartActive(!isCartActive);
            }}
          />
        </div>
        {isLogged && (
          <button
            className="sign-out"
            onClick={() => {
              handleSignOut();
            }}
          >
            Sign Out
          </button>
        )}
      </div>
      <Games
        allGames={allGames}
        findUserId={userId}
        isCartActive={isCartActive}
        isLoading={isLoading}
      />
    </div>
  );
}
