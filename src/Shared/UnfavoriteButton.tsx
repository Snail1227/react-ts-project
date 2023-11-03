export const UnfavoriteButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
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
