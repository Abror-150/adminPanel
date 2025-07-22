import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalContext } from "./context/Context.tsx";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      //@ts-ignore
      cacheTime: 100 * 60 * 10,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <GlobalContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalContext>
    </CookiesProvider>
  </QueryClientProvider>
);
