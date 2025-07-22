import { createContext, useState, type FC, type ReactNode } from "react";
import type { ContextType } from "../types/ContextType";
import { useCookies } from "react-cookie";

export const Context = createContext<ContextType>({
  token: "",
  setToken: () => null,
  showNavbar: false,
  setShowNavbar: () => false,
});

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(cookie.token || null);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  console.log(token);

  setCookie("token", token);
  return (
    <Context.Provider value={{ setToken, token, showNavbar, setShowNavbar }}>
      {children}
    </Context.Provider>
  );
};
