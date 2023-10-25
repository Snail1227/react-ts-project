export const FavoriteButton = ({ disabled, onClick }) => (
  <button
    className="favorite-button"
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  > 
    Favorite
  </button>
);