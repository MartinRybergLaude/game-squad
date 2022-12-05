import { MantineProvider } from "@mantine/core";
import DashboardView from "./pages/Dashboard/dashboardView";
import LoginPresenter from "./pages/Login/loginPresenter";
import RegisterPresenter from "./pages/Register/registerPresenter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

const router = createBrowserRouter([dashboardRoute, loginRoute, registerRoute]);

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        globalStyles: (theme) => ({
          body: {
            overflow: "hidden",
          },
        }),
        primaryColor: "red",
        defaultRadius: "xs",
        cursorType: "pointer",
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
