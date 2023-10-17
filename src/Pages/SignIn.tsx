import { useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleReset = () => {
        setEmail("");
        setPassword("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email)
        console.log(password)

        handleReset();
    } 

    return (
        <>
        <form 
            className="logInForm"
            action="" 
            onSubmit={handleSubmit}
        >
            <h3></h3>
            <h1>Log In</h1>
            <input 
                type="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
             />
            <input 
                type="text"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit">Log In</button>
        </form>
        
        </>
    )
}