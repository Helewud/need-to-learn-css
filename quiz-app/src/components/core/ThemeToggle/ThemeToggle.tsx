import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  MoonDarkIcon,
  MoonLightIcon,
  SunDarkIcon,
  SunLightIcon,
} from "../Icon/Icon";
import styles from "./ThemeToggle.module.scss";

/**
 * ThemeToggle component renders a button that toggles between light and dark themes.
 * It uses the ThemeContext to read and update the current theme.
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggledStyle = styles[`${theme}-mode`];

  return (
    <button className={toggledStyle}>
      {theme === "light" ? <SunDarkIcon /> : <SunLightIcon />}

      {/* The switch container acts as a clickable area to toggle the theme. */}
      <div
        className={styles["switch"]}
        onClick={() => {
          if (theme === "light") setTheme("dark");
          if (theme === "dark") setTheme("light");
        }}
      >
        {/* Visual representation of the switch knob */}
        <div className={styles["switch-knob"]}></div>
      </div>

      {theme === "light" ? <MoonDarkIcon /> : <MoonLightIcon />}
    </button>
  );
};

export default ThemeToggle;
