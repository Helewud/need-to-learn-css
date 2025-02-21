import { NavBar } from "../../core/Nav";
import { BackgroundPatternSmDark } from "./BackgroundPattern";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  showIcon: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showIcon }) => {
  return (
    <div className={styles["layout"]}>
      <BackgroundPatternSmDark className={styles["circle-backdrop"]} />

      <div className={styles["page-nav"]}>
        <NavBar showIcon={showIcon} />
      </div>

      <div className={styles["page-content"]}>{children}</div>
    </div>
  );
};

export default Layout;
