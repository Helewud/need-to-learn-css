import { useEffect, useRef } from "react";
import { ThemeMode } from "../../types/index";
import styles from "./Quiz.module.scss";

const updateProgressBar = (element: HTMLDivElement, progress: number) => {
  if (!(progress >= 0 && progress <= 100)) progress = 0;
  element.style.inlineSize = progress + "%";
};

export const QuizProgressBar = ({
  theme,
  progress,
}: {
  theme: ThemeMode;
  progress: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      updateProgressBar(elementRef.current, progress);
    }
  }, [progress]);

  return (
    <div className={styles[`progress-track-${theme}`]}>
      <div ref={elementRef} className={styles["progress-bar"]}></div>
    </div>
  );
};
