import { useContext } from "react";
import styles from "./Home.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { QuizCategoryContext } from "../../../context/QuizContext";

interface HomeSelectButtonProps {
  children: React.ReactElement;
  category: string;
}

const HomeSelectButton: React.FC<HomeSelectButtonProps> = ({
  children,
  category,
}) => {
  const { theme } = useContext(ThemeContext);
  const { setCategory } = useContext(QuizCategoryContext);

  const buttonStyle = styles[`select-button-${theme}`];

  return (
    <button
      className={buttonStyle}
      value={category}
      onClick={(e) => {
        const target = e.target as HTMLButtonElement;
        setCategory(target.value);
      }}
    >
      {/* Catgegory icon */}
      {children}

      {/* Category to be on the button */}
      <p>{category}</p>
    </button>
  );
};

export default HomeSelectButton;
