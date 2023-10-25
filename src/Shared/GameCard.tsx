import { FavoriteButton } from "./FavoriteButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

export const GameCard = ({
    game: { name, image, releaseDate, developer},
    isLoading,
    onUnfavoriteClick,
    onFavoriteClick,
    isFavorite
}) => {
    return (
        <div className="game-card">
            <h2>{name}</h2>
            <img 
                className="game-img" 
                src={image}
            />
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
    )
}