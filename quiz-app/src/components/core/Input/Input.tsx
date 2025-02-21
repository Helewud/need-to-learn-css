import styles from "./Input.module.scss";

interface InputProps {
  text: string;
  children: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ text, children }) => {
  return (
    <>
      <button className={styles.btn}>
        <p>{text}</p>
        <div>{children}</div>
      </button>
    </>
  );
};

export default Input;
