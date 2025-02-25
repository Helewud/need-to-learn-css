import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./Home.module.scss";

interface HomeSelectButtonProps {
  children: React.ReactElement;
  category: string;
  clickAction: (e: React.MouseEvent) => void;
}

const HomeSelectButton: React.FC<HomeSelectButtonProps> = ({
  children,
  category,
  clickAction,
}) => {
  const { theme } = useContext(ThemeContext);

  const buttonStyle = styles[`select-button-${theme}`];

  return (
    <button className={buttonStyle} value={category} onClick={clickAction}>
      {/* Catgegory icon */}
      {children}

      {/* Category to be on the button */}
      <p>{category}</p>
    </button>
  );
};

export default HomeSelectButton;
