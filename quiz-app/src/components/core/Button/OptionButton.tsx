import styles from "./Button.module.scss";

interface OptionButtonProps {
  text: string;
  children: React.ReactNode;
}

const OptionButton: React.FC<OptionButtonProps> = ({ text, children }) => {
  return (
    <button className={styles["option-button-dark"]}>
      {children}
      <p>{text}</p>
    </button>
  );
};

export default OptionButton;
