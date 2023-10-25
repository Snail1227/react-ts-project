import { Requests } from "../../api";
import { Games } from "./Games";
import { useState, useEffect } from "react";

export function UserMainPage( { userLoggedIn, isLogged, handleSignOut } ) {
    const userId = userLoggedIn?.id
    const userName = userLoggedIn?.fullName;
    const [allGames, setAllGames] = useState([])


    useEffect(() => {
        handlegames();
    }, [])

    const handlegames = () => {
        Requests.showGames().then(setAllGames)
    }


    return (
        <div>
            <div className="welcome-top">
                <div>Welcome, {userName} !</div>
                {isLogged && <button className="sign-out" onClick={handleSignOut}>Sign Out</button> }
            </div>
            <Games 
                allGames={allGames}
                findUserId={userId}
            />
            
        </div>
    )
}