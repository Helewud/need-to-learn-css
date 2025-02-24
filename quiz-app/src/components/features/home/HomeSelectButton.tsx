import { useContext } from "react";
import styles from "./Home.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";

interface HomeSelectButtonProps {
  children: React.ReactElement;
  text: string;
}

const HomeSelectButton: React.FC<HomeSelectButtonProps> = ({
  text,
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  const buttonStyle = styles[`select-button-${theme}`];

  return (
    <button className={buttonStyle}>
      {children}
      <p>{text}</p>
    </button>
  );
};

export default HomeSelectButton;
