import { Requests } from "../../api";
import { Games } from "./Games";
import { useState, useEffect } from "react";

export type Game = {
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
  userLogged: User;
  isLogged: boolean;
  userSignOut: () => void;
  isLoading: boolean;
};

export function UserMainPage({
  userLogged,
  isLogged,
  userSignOut,
  isLoading,
}: UserMainPageProps) {
  const userId = userLogged.id;
  const userName = userLogged.fullName;
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [isCartActive, setIsCartActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    Requests.showGames().then(setAllGames);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("User");
    userSignOut();
  };

  const handleGameSearch = (searchInput: string) => {
    setSearchInput(searchInput);
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
        <input
          type="text"
          onChange={(e) => {
            handleGameSearch(e.target.value);
          }}
          placeholder="Search game..."
        />
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
        searchInput={searchInput}
      />
    </div>
  );
}
