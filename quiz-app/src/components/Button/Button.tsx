import styles from "./Button.module.scss";

export const Button = ({
  text,
  clickAction,
  isDisabled,
}: {
  text: string;
  isDisabled?: boolean;
  clickAction?: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      disabled={isDisabled}
      className={styles["submit-button"]}
      onClick={clickAction}
    >
      {text}
    </button>
  );
};
