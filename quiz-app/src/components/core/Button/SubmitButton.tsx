import styles from "./Button.module.scss";

const SubmitButton = ({ text }: { text: string }) => {
  return (
    <>
      <button className={styles["submit-button"]}>{text}</button>
    </>
  );
};

export default SubmitButton;
