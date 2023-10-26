export const UnfavoriteButton = ({ disabled, onClick }) => (
  <button
    className="favorite-button"
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  > 
    Add to cart
  </button>
);