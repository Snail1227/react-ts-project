import { FavoriteButton } from "./FavoriteButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

type GameCardProps = {
  game: {
    name: string;
    image: string;
    releaseDate: string;
    developer: string;
  };
  isLoading: boolean;
  onUnfavoriteClick: () => void;
  onFavoriteClick: () => void;
  isFavorite: boolean;
};

export const GameCard = ({
  game: { name, image, releaseDate, developer },
  isLoading,
  onUnfavoriteClick,
  onFavoriteClick,
  isFavorite,
}: GameCardProps) => {
  return (
    <div className="game-card">
      <div className="game-name">
        <h2>{name}</h2>
      </div>
      <img className="game-img" src={image} />
      <p>{releaseDate}</p>
      <p>{developer}</p>
      <br />
      {isFavorite ? (
        <FavoriteButton
          onClick={() => {
            onFavoriteClick();
          }}
          disabled={isLoading}
        />
      ) : (
        <UnfavoriteButton
          onClick={() => {
            onUnfavoriteClick();
          }}
          disabled={isLoading}
        />
      )}
    </div>
  );
};
