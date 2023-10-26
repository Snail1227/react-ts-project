import { Requests } from "../../api";
import { Games } from "./Games";
import { useState, useEffect } from "react";

export function UserMainPage( { userLoggedIn, isLogged, handleSignOut } ) {
    const userId = userLoggedIn?.id
    const userName = userLoggedIn?.fullName;
    const [allGames, setAllGames] = useState([]);
    const [isCartActive, setIsCartActive] = useState(false);

    const handleCard  = () => {
        setIsCartActive(!isCartActive);
        favoriteGames();
    }

    // const favoriteGames = (games) => {
    //     const gameIds = games.map(game => game.gameId);
    //     fetchFavoriteGames(gameIds)
    //       .then(favoriteGames);
    //   };

    // const fetchFavoriteGames = (gameIds) => {
    //     return Promise.all(gameIds.map(gameId => Requests.getFavoriteGame(gameId)))
    //       .then(favoriteGames => {
    //         console.log("Favorite Games: ", favoriteGames);
    //         return favoriteGames;
    //       })
    //       .catch(error => {
    //         console.error("Error fetching favorite games: ", error);
    //       });
    //   };



    useEffect(() => {
        handleGames();
    }, [])

    const handleGames = () => {
        Requests.showGames().then(setAllGames)
    }
    // 

    return (
        <div>
            <div className="top">
                <div className="welcome-top">
                    <div>Welcome, {userName} !</div>
                    <img 
                        className={`online-shopping ${isCartActive ? "active-cart": '' }`}
                        src="src\Pictures\online-shopping.png" 
                        alt="online-shopping"
                        onClick={() => {
                            handleCard();
                        }}
                    />
                </div>
                {isLogged && <button className="sign-out" onClick={handleSignOut}>Sign Out</button> }
            </div>
            <Games 
                allGames={allGames}
                findUserId={userId}
                favoriteGames={favoriteGames}
            />
            
        </div>
    )
}