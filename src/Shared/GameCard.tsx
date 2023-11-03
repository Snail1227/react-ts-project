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
    <div 
      className="game-card" 
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* <img className="game-img" src={image} /> */}
      <div className="info-game">
        <h2 className="game-name">{name}</h2>
        <p className="release-date">{releaseDate}</p>
        <p className="developer">{developer}</p>
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
      
    </div>
  );
};
