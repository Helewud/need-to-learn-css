import styles from "./ThemeToggle.module.scss";
import {
  SunDarkIcon,
  MoonDarkIcon,
  MoonLightIcon,
  SunLightIcon,
} from "../Icon/Icon";

interface ThemeToggleProps {
  mode: "light" | "dark";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode }) => {
  if (mode === "light") {
    return (
      <button className={styles["light-mode"]}>
        <SunDarkIcon />
        <div className={styles["switch"]}>
          <div className={styles["switch-knob"]}></div>
        </div>
        <MoonDarkIcon />
      </button>
    );
  }

  if (mode === "dark") {
    return (
      <button className={styles["dark-mode"]}>
        <SunLightIcon />
        <div className={styles["switch"]}>
          <div className={styles["switch-knob"]}></div>
        </div>
        <MoonLightIcon />
      </button>
    );
  }
};

export default ThemeToggle;
