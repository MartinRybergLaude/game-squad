import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import ModalView from "./components/search/modalView";
import DashboardView from "./pages/Dashboard/dashboardView";
import LoginPresenter from "./pages/Login/loginPresenter";
import RegisterPresenter from "./pages/Register/registerPresenter";

const queryClient = new QueryClient();

export const dashboardRoute = {
  path: "/dashboard",
  element: <DashboardView />,
};

export const loginRoute = {
  path: "/login",
  element: <LoginPresenter />,
};

export const registerRoute = {
  path: "/register",
  element: <RegisterPresenter />,
};

export const searchRoute = {
  path: "/search",
  element: <ModalView />,
};

const router = createBrowserRouter([dashboardRoute, loginRoute, registerRoute]);

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        globalStyles: theme => ({
          body: {
            overflow: "hidden",
          },
        }),
        primaryColor: "red",
        defaultRadius: "xs",
        cursorType: "pointer",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
