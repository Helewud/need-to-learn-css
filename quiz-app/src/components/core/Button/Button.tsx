import styles from "./Button.module.scss";

export const Button = ({ text }: { text: string }) => {
  return (
    <>
      <button className={styles["submit-button"]}>{text}</button>
    </>
  );
};
