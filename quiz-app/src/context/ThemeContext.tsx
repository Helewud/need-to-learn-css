import { ReactElement, createContext } from "react";
import { ThemeMode } from "../types";

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: React.Dispatch<ThemeMode>;
}

interface ThemeProviderProps {
  children: ReactElement;
  value: ThemeContextProps;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  setTheme: () => null,
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  value: { theme, setTheme },
}) => {
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
