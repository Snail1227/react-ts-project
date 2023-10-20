import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";

export function SignIn({ onSignIn }) {
    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("");

    const handleReset = () => {
        setEmail("");
        setPassword(""); 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSignIn({
            email: emailInput,
            password: passwordInput
        }).then(() => {
            toast.success(`${emailInput} LoggedIn`)
        }).catch(
            (e: Error) => {
                toast.error(e.message)
            }
        )
    }



    return (
        <>
        <form 
            className="logInForm"
            action="" 
            onSubmit={handleSubmit}
        >
            <h3></h3>
            <h1>Sign In</h1>
            <input 
                type="email"
                value={emailInput}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
             />
            <input 
                type="password"
                value={passwordInput}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit">Log In</button>
        </form>
        </>
    )
}
