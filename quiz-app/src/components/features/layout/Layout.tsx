import NavBar from "./LayoutNav";
import styles from "./Layout.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface LayoutProps {
  category?: React.ReactElement;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, category }) => {
  const { theme } = useContext(ThemeContext);
  const layoutStyle = styles[`layout-${theme}`];

  return (
    <div className={layoutStyle}>
      <div className={styles["page-nav"]}>
        <NavBar>{category}</NavBar>
      </div>

      {children}
    </div>
  );
};

export default Layout;
