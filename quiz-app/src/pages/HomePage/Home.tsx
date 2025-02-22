import Layout from "../../components/features/layout/Layout";
import {
  AccessibilityIcon,
  CssIcon,
  HtmlIcon,
  JsIcon,
} from "../../components/core/Icon";
import styles from "./Home.module.scss";
import HomeSelectButton from "../../components/features/home/HomeSelectButton";

export const Home = () => {
  return (
    <Layout>
      <div className={styles["content"]}>
        <section className={styles["header"]}>
          <h2>
            <span className={styles["minor-header"]}>Welcome to the</span>
            <span className={styles["major-header"]}>Frontend Quiz!</span>
          </h2>
          <p>Pick a subject to get started.</p>
        </section>

        <div className={styles["category-options"]}>
          <HomeSelectButton text="HTML">
            <HtmlIcon />
          </HomeSelectButton>

          <HomeSelectButton text="CSS">
            <CssIcon />
          </HomeSelectButton>

          <HomeSelectButton text="JavaScript">
            <JsIcon />
          </HomeSelectButton>

          <HomeSelectButton text="Accessibility">
            <AccessibilityIcon />
          </HomeSelectButton>
        </div>
      </div>
    </Layout>
  );
};
