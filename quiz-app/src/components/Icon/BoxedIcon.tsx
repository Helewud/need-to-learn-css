import { QuizCategory } from "../../types";
import styles from "./Icon.module.scss";

export const HtmlIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-red"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          fill="#FF7E35"
          d="M24.508 7.607a1.25 1.25 0 0 1 .634 1.65l-10 22.5a1.25 1.25 0 1 1-2.284-1.015l10-22.5a1.251 1.251 0 0 1 1.65-.635ZM10.832 13.44a1.249 1.249 0 0 1 .1 1.765L6.674 20l4.263 4.795a1.25 1.25 0 1 1-1.87 1.66l-5-5.625a1.25 1.25 0 0 1 0-1.66l5-5.625a1.25 1.25 0 0 1 1.764-.105Zm18.337 0a1.25 1.25 0 0 1 1.765.105l5 5.625a1.25 1.25 0 0 1 0 1.66l-5 5.625a1.25 1.25 0 1 1-1.87-1.66L33.327 20l-4.262-4.795a1.25 1.25 0 0 1 .105-1.765Z"
        />
      </svg>
    </span>
  );
};

export const CssIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-green"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          fill="#2FD887"
          d="M10 2.505a1.25 1.25 0 0 0-1.25 1.25V21.25a5 5 0 0 0 5 5H15v6.25a4.999 4.999 0 0 0 9.615 1.913c.25-.607.38-1.257.38-1.913v-6.25h1.255a5 5 0 0 0 5-5V3.755A1.25 1.25 0 0 0 30 2.505H10ZM28.75 17.5h-17.5V5.005h7.5V8.76a1.25 1.25 0 0 0 2.5 0V5.005h2.5v6.24a1.25 1.25 0 0 0 2.5 0v-6.24h2.5V17.5Zm-17.5 3.75V20h17.5v1.25a2.5 2.5 0 0 1-2.5 2.5h-2.505a1.25 1.25 0 0 0-1.25 1.25v7.5a2.497 2.497 0 1 1-4.995 0V25a1.25 1.25 0 0 0-1.25-1.25h-2.5a2.5 2.5 0 0 1-2.5-2.5Z"
        />
      </svg>
    </span>
  );
};

export const AccessibilityIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-purple"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          fill="#A729F5"
          d="M16.875 8.125a3.125 3.125 0 1 1 6.25 0 3.125 3.125 0 0 1-6.25 0ZM20 2.5a5.625 5.625 0 0 0-5.475 6.915l-4.03-1.625a4 4 0 0 0-5.19 2.18 3.95 3.95 0 0 0 2.175 5.175l5.02 2.027v5.96l-4.532 8.525a3.98 3.98 0 0 0 7.024 3.738L20 25.975l5.01 9.42a3.978 3.978 0 0 0 7.025-3.735L27.5 23.13v-5.957l5.02-2.028a3.95 3.95 0 0 0 2.175-5.175 4 4 0 0 0-5.19-2.183l-4.027 1.628A5.626 5.626 0 0 0 20 2.5ZM7.618 10.922a1.5 1.5 0 0 1 1.94-.817l8.57 3.463a5 5 0 0 0 3.744 0l8.57-3.463a1.5 1.5 0 0 1 1.94.817 1.45 1.45 0 0 1-.8 1.905l-5.02 2.025A2.5 2.5 0 0 0 25 17.175v5.957c0 .41.1.814.293 1.175l4.535 8.528a1.48 1.48 0 0 1-2.61 1.39l-5.01-9.425a2.5 2.5 0 0 0-4.415 0l-5.008 9.418a1.477 1.477 0 1 1-2.61-1.388l4.532-8.525A2.5 2.5 0 0 0 15 23.133v-5.96a2.5 2.5 0 0 0-1.563-2.318l-5.02-2.03a1.45 1.45 0 0 1-.8-1.902Z"
        />
      </svg>
    </span>
  );
};

export const JsIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-blue"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          fill="#306AFF"
          d="M21.25 18.75A3.75 3.75 0 0 1 25 15h3.75a1.25 1.25 0 0 1 0 2.5H25a1.25 1.25 0 0 0-1.25 1.25V20A1.25 1.25 0 0 0 25 21.25h1.25A3.75 3.75 0 0 1 30 25v1.25A3.75 3.75 0 0 1 26.25 30H22.5a1.25 1.25 0 0 1 0-2.5h3.75a1.25 1.25 0 0 0 1.25-1.25V25a1.25 1.25 0 0 0-1.25-1.25H25A3.75 3.75 0 0 1 21.25 20v-1.25ZM20 16.25a1.25 1.25 0 0 0-2.5 0v10a1.25 1.25 0 0 1-1.25 1.25h-2.5a1.25 1.25 0 0 0 0 2.5h2.5A3.75 3.75 0 0 0 20 26.25v-10Zm-15-5A6.25 6.25 0 0 1 11.25 5h17.5A6.25 6.25 0 0 1 35 11.25v17.5A6.25 6.25 0 0 1 28.75 35h-17.5A6.25 6.25 0 0 1 5 28.75v-17.5Zm6.25-3.75a3.75 3.75 0 0 0-3.75 3.75v17.5a3.75 3.75 0 0 0 3.75 3.75h17.5a3.75 3.75 0 0 0 3.75-3.75v-17.5a3.75 3.75 0 0 0-3.75-3.75h-17.5Z"
        />
      </svg>
    </span>
  );
};

export const SystemDesignIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-blue"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="3" fill="#4A90E2" />
        <circle cx="10" cy="10" r="2.5" fill="#4A90E2" />
        <circle cx="30" cy="10" r="2.5" fill="#4A90E2" />
        <circle cx="10" cy="30" r="2.5" fill="#4A90E2" />
        <circle cx="30" cy="30" r="2.5" fill="#4A90E2" />
        <line
          x1="20"
          y1="17"
          x2="10"
          y2="12.5"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="17"
          x2="30"
          y2="12.5"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="23"
          x2="10"
          y2="27.5"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="23"
          x2="30"
          y2="27.5"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
        <line
          x1="12.5"
          y1="10"
          x2="27.5"
          y2="10"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
        <line
          x1="12.5"
          y1="30"
          x2="27.5"
          y2="30"
          stroke="#4A90E2"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
};

export const DevOpsIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-green"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path
          d="M28 20c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.6 0 3.1-0.5 4.3-1.3"
          fill="none"
          stroke="#7ED321"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 20c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8c-1.6 0-3.1 0.5-4.3 1.3"
          fill="none"
          stroke="#7ED321"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="20" r="2" fill="#7ED321" />
        <circle cx="32" cy="20" r="2" fill="#7ED321" />
      </svg>
    </span>
  );
};

export const PythonIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-red"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path
          d="M30 15C30 12.2 27.8 10 25 10H15C12.2 10 10 12.2 10 15V20H15C17.8 20 20 22.2 20 25V30H25C27.8 30 30 27.8 30 25V15Z"
          fill="#306998"
        />
        <path
          d="M10 25C10 27.8 12.2 30 15 30H25C27.8 30 30 27.8 30 25V20H25C22.2 20 20 17.8 20 15V10H15C12.2 10 10 12.2 10 15V25Z"
          fill="#FFD43B"
        />
        <circle cx="15" cy="15" r="2" fill="white" />
        <circle cx="25" cy="25" r="2" fill="white" />
      </svg>
    </span>
  );
};

export const GoIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-blue"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <ellipse cx="20" cy="21" rx="10" ry="11" fill="#00ADD8" />
        <circle cx="15" cy="18" r="2" fill="white" />
        <circle cx="25" cy="18" r="2" fill="white" />
        <path
          d="M10 17 C10 12 12 10 12 10"
          stroke="#00ADD8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M30 17 C30 12 28 10 28 10"
          stroke="#00ADD8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 24 C16 25 18 26 20 26 C22 26 24 25 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export const CloudIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-green"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path
          d="M30 22C31.7 22 33 20.7 33 19C33 17.5 32 16.2 30.6 15.9C30.8 15.3 31 14.7 31 14C31 11.2 28.8 9 26 9C23.9 9 22.1 10.3 21.3 12.1C20.6 11.4 19.6 11 18.5 11C16.6 11 15 12.6 15 14.5C15 14.8 15 15.1 15.1 15.4C13.3 16 12 17.7 12 19.5C12 21.4 13.3 23 15 23.6C15 23.7 15 23.9 15 24C15 26.2 16.8 28 19 28H30C31.7 28 33 26.7 33 25C33 23.3 31.7 22 30 22Z"
          fill="#50E3C2"
        />
      </svg>
    </span>
  );
};

export const DatabaseIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-green"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <ellipse
          cx="20"
          cy="12"
          rx="10"
          ry="4"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2"
        />
        <path
          d="M10 12 V28 C10 30.2 14.5 32 20 32 C25.5 32 30 30.2 30 28 V12"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2"
        />
        <path
          d="M10 20 C10 22.2 14.5 24 20 24 C25.5 24 30 22.2 30 20"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
};

export const APIIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-red"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <rect x="10" y="15" width="20" height="10" rx="2" fill="#FF7E35" />
        <path d="M15 15 V10 H25 V15" stroke="#FF7E35" strokeWidth="2" />
        <path d="M15 25 V30 H25 V25" stroke="#FF7E35" strokeWidth="2" />
        <text
          x="14.5"
          y="23"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          fontWeight="bold"
          fill="white"
        >
          API
        </text>
      </svg>
    </span>
  );
};

export const MLIcon = () => {
  return (
    <span className={styles["boxed-icon-bg-blue"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <circle cx="20" cy="10" r="2.5" fill="#9013FE" />
        <circle cx="13" cy="16" r="2.5" fill="#9013FE" />
        <circle cx="27" cy="16" r="2.5" fill="#9013FE" />
        <circle cx="10" cy="24" r="2.5" fill="#9013FE" />
        <circle cx="20" cy="24" r="2.5" fill="#9013FE" />
        <circle cx="30" cy="24" r="2.5" fill="#9013FE" />
        <circle cx="20" cy="32" r="2.5" fill="#9013FE" />

        <line
          x1="20"
          y1="12.5"
          x2="15.5"
          y2="16"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="12.5"
          x2="24.5"
          y2="16"
          stroke="#9013FE"
          strokeWidth="1.5"
        />

        <line
          x1="13"
          y1="18.5"
          x2="10"
          y2="21.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
        <line
          x1="13"
          y1="18.5"
          x2="20"
          y2="21.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />

        <line
          x1="27"
          y1="18.5"
          x2="20"
          y2="21.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
        <line
          x1="27"
          y1="18.5"
          x2="30"
          y2="21.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />

        <line
          x1="10"
          y1="26.5"
          x2="20"
          y2="29.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="26.5"
          x2="20"
          y2="29.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
        <line
          x1="30"
          y1="26.5"
          x2="20"
          y2="29.5"
          stroke="#9013FE"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
};

interface SingleAlphabetIconProps {
  letter: string;
}

export const SingleAlphabetIcon: React.FC<SingleAlphabetIconProps> = ({
  letter,
}) => {
  return (
    <span className={styles["boxed-icon-bg-grey"]}>
      <span>{letter}</span>
    </span>
  );
};

export const GetIconComponentByCategory = (category: QuizCategory) => {
  switch (category) {
    case "HTML":
      return <HtmlIcon />;
    case "CSS":
      return <CssIcon />;
    case "JavaScript":
      return <JsIcon />;
    case "Accessibility":
      return <AccessibilityIcon />;
    case "System Design":
      return <SystemDesignIcon />;
    case "API":
      return <APIIcon />;
    case "Cloud":
      return <CloudIcon />;
    case "Database":
      return <DatabaseIcon />;
    case "DevOps":
      return <DevOpsIcon />;
    case "Go":
      return <GoIcon />;
    case "ML":
      return <MLIcon />;
    case "Python":
      return <PythonIcon />;
  }
};
