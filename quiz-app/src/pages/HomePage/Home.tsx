import { OptionButton } from "../../components/core/Button";
import Layout from "../../components/features/layout/Layout";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  AccessibilityIcon,
} from "../../components/core/Icon";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Layout showIcon={true}>
      <div className={styles["home-content"]}>
        <section className={styles["header"]}>
          <h2>
            <span className={styles["minor-header"]}>Welcome to the</span>
            <span className={styles["major-header"]}>Frontend Quiz!</span>
          </h2>
          <p>Pick a subject to get started.</p>
        </section>

        <div className={styles["quiz-options"]}>
          <OptionButton text="HTML">
            <HtmlIcon />
          </OptionButton>

          <OptionButton text="CSS">
            <CssIcon />
          </OptionButton>

          <OptionButton text="JavaScript">
            <JsIcon />
          </OptionButton>

          <OptionButton text="Accessibility">
            <AccessibilityIcon />
          </OptionButton>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
