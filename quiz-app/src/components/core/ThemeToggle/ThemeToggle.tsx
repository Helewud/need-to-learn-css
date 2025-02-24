import { MouseEventHandler, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  MoonDarkIcon,
  MoonLightIcon,
  SunDarkIcon,
  SunLightIcon,
} from "../Icon/Icon";
import styles from "./ThemeToggle.module.scss";

const Switch = ({ clickAction }: { clickAction: MouseEventHandler }) => {
  return (
    <div className={styles["switch"]} onClick={clickAction}>
      <div className={styles["switch-knob"]}></div>
    </div>
  );
};

const ThemeToggle = () => {
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  };

  const { theme, setTheme } = useContext(ThemeContext);
  const togglestyle = styles[`${theme}-mode`];

  return (
    <button className={togglestyle}>
      {theme === "light" ? <SunDarkIcon /> : <SunLightIcon />}
      <Switch clickAction={toggleTheme} />
      {theme === "light" ? <MoonDarkIcon /> : <MoonLightIcon />}
    </button>
  );
};

export default ThemeToggle;
