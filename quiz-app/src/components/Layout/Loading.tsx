import { useEffect, useRef } from "react";
import styles from "./Layout.module.scss";
import { ThemeMode } from "../../types";

const Spinner = () => (
  <svg width="48" height="48" viewBox="0 0 38 38" stroke="#6366f1">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="2">
        <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

const LoadingOverlay = ({
  content,
  theme,
}: {
  content: string;
  theme: ThemeMode;
}) => {
  const layoutRef = useRef(
    document.getElementsByClassName(styles["layout-" + theme])
  );

  useEffect(() => {
    const layout = layoutRef.current.item(0) as HTMLDivElement;
    layout.style.setProperty("pointer-events", "none");

    return () => {
      layout.style.setProperty("pointer-events", "");
    };
  }, []);

  return (
    <div className={styles["overlay-layout"]}>
      <div className={styles["overlay-card"]}>
        <div className={styles["spinner"]}>
          <Spinner />
        </div>
        <p className={styles["text-content"]}>{content}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
