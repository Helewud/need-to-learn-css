import { BackgroundPatternSmDark } from "./LayoutBgPattern";
import NavBar from "./LayoutNav";
import styles from "./Layout.module.scss";

interface LayoutProps {
  category?: React.ReactElement;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, category }) => {
  return (
    <div className={styles["layout-dark"]}>
      <BackgroundPatternSmDark className={styles["circle-backdrop"]} />

      <div className={styles["page-nav"]}>
        <NavBar>{category}</NavBar>
      </div>

      <div className={styles["page-content"]}>{children}</div>
    </div>
  );
};

export default Layout;
