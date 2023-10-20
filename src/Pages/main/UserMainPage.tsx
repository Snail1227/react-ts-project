export function UserMainPage( { userNameLoggedIn, isLogged, handleSignOut } ) {

    const userName = userNameLoggedIn?.fullName;

    return (
        <>
        <div>Welcome, {userName} !</div>
        <br/>
        {isLogged && <button onClick={handleSignOut}>Sign Out</button> }
        </>
    )
}