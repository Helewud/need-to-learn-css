import { createContext, JSX, ReactElement } from "react";

interface PageContentContextProps {
  pageContent?: JSX.Element;
  setPageContent: React.Dispatch<JSX.Element>;
}

interface PageContentProviderProps {
  children: ReactElement;
  value: PageContentContextProps;
}

export const PageContentContext = createContext<PageContentContextProps>({
  pageContent: undefined,
  setPageContent: () => null,
});

export const PageContentProvider: React.FC<PageContentProviderProps> = ({
  children,
  value: { pageContent, setPageContent },
}) => {
  return (
    <PageContentContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContentContext.Provider>
  );
};
