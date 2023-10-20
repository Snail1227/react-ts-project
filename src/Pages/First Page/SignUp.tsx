import { useState } from "react"
import toast from "react-hot-toast";

type SignUpProps = {
    handleCreateUser: (userData: { fullName: string; email: string; password: string }) => Promise<void>;
  };

export function SignUp( { handleCreateUser}: SignUpProps ) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const filledData = fullName && email && password;

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (filledData) {
            handleCreateUser({
                fullName: fullName,
                email: email,
                password: password
            })
            .then(() => {
                toast.success(`Created ${fullName}`);
              })
              .catch((e: Error) => {
                toast.error(e.message);
              });
        }
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
            <h1>Sign Up</h1>
            <input 
                type="text"
                value={fullName}
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
             />
            <input 
                type="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
             />
            <input 
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

             <button type="submit">Sign Up</button>
        </form>
        </>
    )
}