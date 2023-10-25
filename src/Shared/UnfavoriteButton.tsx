export const UnfavoriteButton = ({ onClick, disabled }) => (
  <button
    className="unfavorite-button"
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  >
    Unfavorite
  </button>
);