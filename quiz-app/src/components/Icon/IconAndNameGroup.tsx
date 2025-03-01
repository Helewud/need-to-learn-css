import React from "react";
import styles from "./Icon.module.scss";

interface IconAndNameGroupProps {
  name: string;
  children: React.ReactNode;
}

const IconAndNameGroup: React.FC<IconAndNameGroupProps> = ({
  name,
  children,
}) => {
  return (
    <section className={styles["icon-name-group"]}>
      {children}
      <h2>{name}</h2>
    </section>
  );
};

export default IconAndNameGroup;
