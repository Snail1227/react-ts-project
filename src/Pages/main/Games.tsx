import { useEffect, useState } from "react";
import { GameCard } from "../../Shared/GameCard";
import { FavoriteGameEntry, Requests } from "../../api";
import toast from "react-hot-toast";
import { Game } from "./UserMainPage";

export function Games({
  allGames,
  isLoading,
  findUserId,
  isCartActive,
  searchInput,
}: {
  allGames: Game[];
  isLoading: boolean;
  findUserId: number;
  isCartActive: boolean;
  searchInput: string;
}) {
  const [allFavoriteGamesIds, setAllFavoriteGamesIds] = useState<
    FavoriteGameEntry[]
  >([]);
  const [allFavoriteGames, setAllFavoriteGames] = useState<Game[]>([]);

  const favoriteSearchedGames = allFavoriteGames.filter((game) =>
    game.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );
  const searchedGames = allGames.filter((game) =>
    game.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const gamesToShow = isCartActive
    ? searchInput.length === 0
      ? allFavoriteGames
      : favoriteSearchedGames
    : searchInput.length === 0
    ? allGames
    : searchedGames;

  useEffect(() => {
    Requests.getGame({ findUserId: findUserId }).then(setAllFavoriteGamesIds);
  }, [findUserId]);

  useEffect(() => {
    if (isCartActive) {
      const gameIds = allFavoriteGamesIds.map((game) => game.gameId);
      const fundGame = allGames.filter((game) => gameIds.includes(game.id));
      setAllFavoriteGames(fundGame);
    } else {
      setAllFavoriteGames([]);
    }
  }, [isCartActive, allFavoriteGamesIds, allGames]);

  const handleAddFavoriteGame = (gameId: number) => {
    const newFavorite = { userId: findUserId, gameId };
    Requests.addFavoriteGame(newFavorite)
      .then((newFavorite) =>
        setAllFavoriteGamesIds((prev) => [...prev, newFavorite])
      )
      .catch((error) => {
        toast.error("Error adding favorite game: " + error.message);
      });
  };

  const handleRemoveFavoriteGame = (gameId: number) => {
    const favoriteGameEntry = allFavoriteGamesIds.find(
      (entry) => entry.gameId === gameId
    );

    if (favoriteGameEntry && favoriteGameEntry.id) {
      Requests.removeFavoriteGame(favoriteGameEntry.id)
        .then(() =>
          setAllFavoriteGamesIds((prev) =>
            prev.filter((game) => game.gameId !== gameId)
          )
        )
        .catch((error) => {
          toast.error("Error removing favorite game: " + error.message);
        });
    }
  };

  return (
    <div className="cards-folder">
      {gamesToShow.map((item) => (
        <GameCard
          game={{
            image: item.image,
            releaseDate: item.releaseDate,
            name: item.name,
            developer: item.developer,
          }}
          isFavorite={allFavoriteGamesIds
            .map((fan) => fan.gameId)
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
