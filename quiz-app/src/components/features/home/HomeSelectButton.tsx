import styles from "./Home.module.scss";

interface HomeSelectButtonProps {
  children: React.ReactElement;
  text: string;
}

const HomeSelectButton: React.FC<HomeSelectButtonProps> = ({
  text,
  children,
}) => {
  return (
    <button className={styles["select-button-dark"]}>
      {children}
      <p>{text}</p>
    </button>
  );
};

export default HomeSelectButton;
