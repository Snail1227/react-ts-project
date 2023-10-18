export const baseUrl = "http://localhost:3000/users";

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
      }),
    }).then((response) => response.json());
  },

  logInUser: ( { email }: User) => {
    return fetch(baseUrl)
      .then((response) => {
        if(!response.ok) {
            throw new Error("Could not get user");
        }
        return response.json();
      })
      .then((users) => {
        const user = users.find((user: any) => user.email === email);
        if(!user) {
            throw new Error("User Not found");
        }
        return user;
      });
  },

};
