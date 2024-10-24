import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserAuthenticationProvider } from "./UserAuthenticationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserAuthenticationProvider>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </QueryClientProvider>
  </UserAuthenticationProvider>
);
