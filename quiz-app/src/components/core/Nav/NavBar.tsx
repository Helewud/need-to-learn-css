import styles from "@/components/core/Nav/Nav.module.scss";
import { AccessibilityIcon } from "@/components/core/Icon";
import { ThemeToggle } from "@/components/core/ThemeToggle";
import IconAndNameGroup from "../Icon/IconAndNameGroup";

interface NavBarProps {
  showIcon: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showIcon }) => {
  return (
    <div className={styles["nav-bar"]}>
      {/* Show Accessibility Icon on request */}
      {showIcon && (
        <section className={styles["left-side"]}>
          <IconAndNameGroup name="Accessibility">
            <AccessibilityIcon />
          </IconAndNameGroup>
        </section>
      )}

      {/* Theme Toggle always displayed */}
      <section className={styles["right-side"]}>
        <ThemeToggle mode="dark" />
      </section>
    </div>
  );
};

export default NavBar;
