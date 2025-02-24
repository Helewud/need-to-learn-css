import { ReactElement, createContext } from "react";
import { ThemeMode } from "../types/theme.types";

export const ThemeContext = createContext<{
  theme: ThemeMode;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setTheme: Function;
}>({
  theme: "dark",
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  value: { theme, setTheme },
}: {
  children: ReactElement;
  value: { theme: ThemeMode; setTheme: VoidFunction };
}) => {
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
