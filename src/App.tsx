import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import ModalView from "./components/search/modalView";
import DashboardView from "./pages/Dashboard/dashboardView";
import LoginPresenter from "./pages/Login/loginPresenter";
import RegisterPresenter from "./pages/Register/registerPresenter";
import VerificationPresenter from "./pages/Verification/verificationPresenter";

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

export const verificationRoute = {
  path: "/verification",
  element: <VerificationPresenter />,
};

export const authRoute = {
  path: "/_/auth/action",
  element: <p>Verifierad</p>,
};

const router = createBrowserRouter([
  dashboardRoute,
  loginRoute,
  registerRoute,
  authRoute,
  verificationRoute,
]);

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
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
