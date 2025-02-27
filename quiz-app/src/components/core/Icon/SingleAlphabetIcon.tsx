import styles from "./Icon.module.scss";

interface SingleAlphabetIconProps {
  letter: string;
}

const SingleAlphabetIcon: React.FC<SingleAlphabetIconProps> = ({ letter }) => {
  return (
    <span className={styles["boxed-icon-bg-grey"]}>
      <span>{letter}</span>
    </span>
  );
};

export default SingleAlphabetIcon;
