import { FavoriteButton } from "./FavoriteButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

export const GameCard = ({
    game: { name, image, releaseDate, developer, price},
    isLoading,
    onUnfavoriteClick,
    onFavoriteClick,
    isFavorite
}) => {
    return (
        <div className="game-card">
            <div className="game-name">
                <h2>{name}</h2>
            </div>
            <img 
                className="game-img" 
                src={image}
            />
            <p>{releaseDate}</p>
            <p>{developer}</p>
            <p>${price}</p>
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