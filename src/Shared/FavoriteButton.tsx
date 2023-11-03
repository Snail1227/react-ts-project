export const FavoriteButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
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
