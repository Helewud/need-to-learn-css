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

  const body = document.getElementsByTagName("body")[0];

  if (theme === "dark") {
    body.style.setProperty("--bg-color", "#313e51");
  }

  if (theme === "light") {
    body.style.setProperty("--bg-color", "#f4f6fa");
  }

  return (
    <div className={toggledStyle}>
      {theme === "light" ? <SunDarkIcon /> : <SunLightIcon />}

      {/* The switch container acts as a clickable area to toggle the theme. */}
      <button
        className={styles["switch"]}
        onClick={() => {
          if (theme === "light") setTheme("dark");
          if (theme === "dark") setTheme("light");
        }}
      >
        {/* Visual representation of the switch knob */}
        <span className={styles["switch-knob"]}></span>
      </button>

      {theme === "light" ? <MoonDarkIcon /> : <MoonLightIcon />}
    </div>
  );
};

export default ThemeToggle;
