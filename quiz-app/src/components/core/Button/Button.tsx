import styles from "./Button.module.scss";

export const Button = ({
  text,
  clickAction,
}: {
  text: string;
  clickAction?: (e: React.MouseEvent) => void;
}) => {
  return (
    <>
      <button className={styles["submit-button"]} onClick={clickAction}>
        {text}
      </button>
    </>
  );
};
