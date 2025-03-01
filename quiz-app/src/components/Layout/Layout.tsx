import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { QuizCategory } from "../../types";
import { HeaderIcon } from "../Icon/HeaderIcon";
import styles from "./Layout.module.scss";
import NavBar from "./LayoutNav";

interface LayoutProps {
  category: QuizCategory;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, category }) => {
  const { theme } = useContext(ThemeContext);

  const layoutStyle = styles[`layout-${theme}`];

  return (
    <div className={layoutStyle}>
      <div className={styles["page-nav"]}>
        <NavBar>{<HeaderIcon category={category} />}</NavBar>
      </div>

      <div className={styles["page-content"]}>{children}</div>
    </div>
  );
};

export default Layout;
