import styles from "./Icon.module.scss";

interface SingleAlphabetIconProps {
  letter: string;
}

const SingleAlphabetIcon: React.FC<SingleAlphabetIconProps> = ({ letter }) => {
  return (
    <div className={styles["boxed-icon-bg-grey"]}>
      <p>{letter}</p>
    </div>
  );
};

export default SingleAlphabetIcon;
