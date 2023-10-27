export const baseUrl = "http://localhost:3000";

type User = {
  fullName?: string;
  email: string;
  password?: string;
  findUserId?: string;
  userId?: string;
  gameId?: number;
};

type FavoriteGameEntry = {
  userId: string;
  gameId: number;
  id: number;
};

type FavoriteGameDeleteRequest = {
  removeFavoriteGame?: number;
};

type GetGameRequest = {
  findUserId: string;
};

export const Requests = {
  createUser: ({ fullName, email, password }: User) => {
    return fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    });
  },
  checkSameEmail: ({ email }: User) => {
    return fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((users) => {
        const checkEmail = users.find((user: User) => user.email === email);
        if (checkEmail) {
          throw new Error(`${email} is already in use`);
        }
        return false;
      });
  },

  logInUser: ({ email, password }: User) => {
    return fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not get user");
        }
        return response.json();
      })
      .then((users) => {
        const user = users.find((user: User) => user.email === email);
        if (!user) {
          throw new Error("User Not found");
        }

        if (user.password !== password) {
          throw new Error("Invalid Password");
        }

        return user;
      });
  },

  showGames: () => {
    return fetch(`${baseUrl}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Could not get games");
      }
      return response.json();
    });
  },

  getGame: ({ findUserId }: GetGameRequest) => {
    return fetch(`${baseUrl}/favoriteGame`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not get favorite games");
        }
        return response.json();
      })
      .then((games: FavoriteGameEntry[]) => {
        const findFavoriteGames = games.filter(
          (user) => user.userId === findUserId
        );
        return findFavoriteGames;
      });
  },
  addFavoriteGame: ({ userId, gameId }: User) => {
    return fetch(`${baseUrl}/favoriteGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        gameId: gameId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add favorite game");
      }
      return response.json();
    });
  },

  removeFavoriteGame: ({ removeFavoriteGame }: FavoriteGameDeleteRequest) => {
    return fetch(`${baseUrl}/favoriteGame/${removeFavoriteGame}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log();
      if (!response.ok) {
        throw new Error("Failed to delete favorite game");
      }
      return "Successfully deleted favorite game";
    });
  },
};
