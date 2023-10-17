export const baseUrl = "http://localhost:3000/users"

type User = {
    fullName: string;
    email: string;
    password: string;
};

export const Requests = {
    createUser: ({ fullName, email, password }: User) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
            })
        }).then((response) => response.json());
    }
} 