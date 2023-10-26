import { useEffect, useState } from "react";
import { GameCard } from "../../Shared/GameCard";
import { Requests } from "../../api";

type Game = {
  id: number;
  name: string;
  image: string;
  releaseDate: string;
  developer: string;
  price?: number;
};

type FavoriteGame = {
  id?: number;
  userId: number;
  gameId: number;
};

export function Games({
  allGames,
  isLoading,
  findUserId,
  favoriteGames
}: {
  allGames: Game[];
  isLoading: boolean;
  findUserId: number;
  favoriteGames: any;
}) {
  const [allFavoriteGames, setAllFavoriteGames] = useState<FavoriteGame[]>([]);

  favoriteGames(allFavoriteGames)

  useEffect(() => {
    Requests.getGame({ findUserId }).then(setAllFavoriteGames);
  }, [findUserId]);


  const handleAddFavoriteGame = (addGame: number) => {
    const newFavoriteGame: FavoriteGame = {
      userId: findUserId,
      gameId: addGame,
    };
    setAllFavoriteGames((prevGames) => [...prevGames, newFavoriteGame]);

    Requests.addFavoriteGame({ userId: findUserId, gameId: addGame })
      .then((response: FavoriteGame) => {
        setAllFavoriteGames((prevGames) => [
          ...prevGames.filter((game) => game.gameId !== addGame),
          response,
        ]);
      })
      .catch((err) => {
        console.error("Error adding favorite game:", err);
        setAllFavoriteGames((prevGames) =>
          prevGames.filter((game) => game.gameId !== addGame)
        );
      });
  };

  const handleRemoveFavoriteGame = (deleteGame: number) => {
    console.log(`this delete game ${deleteGame}`);

    const updatedFavorites = allFavoriteGames.filter(
      (entry) => entry.gameId !== deleteGame
    );
    const removeFavoriteGame = allFavoriteGames
      .filter((entry) => entry.gameId === deleteGame)
      .map((entry) => entry.id);
    setAllFavoriteGames(updatedFavorites);

    const deleteFavoriteGame: FavoriteGame = {
      userId: findUserId,
      gameId: deleteGame,
      id: removeFavoriteGame,
    };

    Requests.removeFavoriteGame({ removeFavoriteGame }).catch((err) => {
      console.error("Error removing favorite game:", err);
      setAllFavoriteGames((prevGames) => [...prevGames, deleteFavoriteGame]);
    });
  };

  return (
    <div className="cards-folder">
      {allGames.map((item) => (
        <GameCard
          game={{
            image: item.image,
            releaseDate: item.releaseDate,
            name: item.name,
            developer: item.developer,
            price: item.price,
          }}
          isFavorite={allFavoriteGames
            .map((game) => game.gameId)
            .includes(item.id)}
          key={item.id}
          onUnfavoriteClick={() => {
            handleAddFavoriteGame(item.id);
          }}
          onFavoriteClick={() => {
            handleRemoveFavoriteGame(item.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
