import { useEffect, useState } from "react";
import { GameCard } from "../../Shared/GameCard";
import { Requests } from "../../api";
import toast from "react-hot-toast";

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
  isCartActive,
}: {
  allGames: Game[];
  isLoading: boolean;
  findUserId: number;
  isCartActive: boolean;
}) {
  const [allFavoriteGamesIds, setAllFavoriteGamesIds] = useState<FavoriteGame[]>([]);
  const [allFavoriteGames, setAllFavoriteGames] = useState<Game[]>([])
  const GamesToShow = isCartActive ? allFavoriteGames : allGames;

  useEffect(() => {
    Requests.getGame({ findUserId }).then(setAllFavoriteGamesIds);
  }, [findUserId]);

  useEffect(() => {
    if (isCartActive) {
      const gameIds = allFavoriteGamesIds.map(game => game.gameId);
      const fundGame = allGames.filter((game) => gameIds.includes(game.id))
      setAllFavoriteGames(fundGame)
    } else {
      setAllFavoriteGames([])
    }
  }, [isCartActive, allFavoriteGamesIds, allGames])

  const handleAddFavoriteGame = (addGame: number) => {
    const newFavoriteGame: FavoriteGame = {
      userId: findUserId,
      gameId: addGame,
    };
    setAllFavoriteGamesIds((prevGames) => [...prevGames, newFavoriteGame]);

    Requests.addFavoriteGame({ userId: findUserId, gameId: addGame })
      .then((response: FavoriteGame) => {
        setAllFavoriteGamesIds((prevGames) => [
          ...prevGames.filter((game) => game.gameId !== addGame),
          response,
        ]);
      })
      .catch((err) => {
        toast.error("Error adding favorite game:", err);
        setAllFavoriteGamesIds((prevGames) =>
          prevGames.filter((game) => game.gameId !== addGame)
        );
      });
  };

  const handleRemoveFavoriteGame = (deleteGame: number) => {
    console.log(`this delete game ${deleteGame}`);

    const updatedFavorites = allFavoriteGamesIds.filter(
      (entry) => entry.gameId !== deleteGame
    );
    setAllFavoriteGamesIds(updatedFavorites);
    const removeFavoriteGame = allFavoriteGamesIds
      .filter((entry) => entry.gameId === deleteGame)
      .map((entry) => entry.id);
      
    const deleteFavoriteGame: FavoriteGame = {
      userId: findUserId,
      gameId: deleteGame,
      id: removeFavoriteGame,
    };

    Requests.removeFavoriteGame({ removeFavoriteGame }).catch((err) => {
      toast
      .error("Error removing favorite game:", err);
      setAllFavoriteGamesIds((prevGames) => [...prevGames, deleteFavoriteGame]);
    });
  };

  return (
    <div className="cards-folder">
      {GamesToShow.map((item) => (
        <GameCard
          game={{
            image: item.image,
            releaseDate: item.releaseDate,
            name: item.name,
            developer: item.developer,
          }}
          isFavorite={allFavoriteGamesIds
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
