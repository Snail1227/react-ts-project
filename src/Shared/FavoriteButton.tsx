export const FavoriteButton = ({ onClick, disabled }) => (
  <button
    className="unfavorite-button"
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  >
    Remove
  </button>
);