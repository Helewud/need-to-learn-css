import React from "react";
import styles from "./Score.module.scss";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles["card-dark"]}>{children}</div>;
};

export default Card;
