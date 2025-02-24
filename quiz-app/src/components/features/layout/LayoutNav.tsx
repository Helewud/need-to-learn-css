import { ThemeToggle } from "@/components/core/ThemeToggle";
import styles from "./Layout.module.scss";

interface NavBarProps {
  children?: React.ReactElement;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <div className={styles["nav-bar"]}>
      <section className={styles["left-side"]}>{children}</section>

      <section className={styles["right-side"]}>
        <ThemeToggle />
      </section>
    </div>
  );
};

export default NavBar;
