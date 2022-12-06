import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import RequireAuth from "./components/requireAuth/requireAuth";
import ModalView from "./components/search/modalView";
import AuthPresenter from "./pages/Auth/authPresenter";
import DashboardView from "./pages/Dashboard/dashboardView";
import LoginPresenter from "./pages/Login/loginPresenter";
import { NotFound } from "./pages/NotFound/notFoundView";
import RegisterPresenter from "./pages/Register/registerPresenter";
import RequestResetPasswordPresenter from "./pages/RequestResetPassword/requestResetPasswordPresenter";
import VerificationPresenter from "./pages/Verification/verificationPresenter";

export const dashboardRoute: RouteObject = {
  path: "/dashboard",
  element: (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  ),
};

export const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFound />,
};

export const loginRoute: RouteObject = {
  path: "/login",
  element: <LoginPresenter />,
};

export const requestResetRoute: RouteObject = {
  path: "/request-reset",
  element: <RequestResetPasswordPresenter />,
};

export const registerRoute: RouteObject = {
  path: "/register",
  element: <RegisterPresenter />,
};

export const searchRoute: RouteObject = {
  path: "/search",
  element: <ModalView />,
};

export const verificationRoute: RouteObject = {
  path: "/verification",
  element: <VerificationPresenter />,
};

export const authRoute: RouteObject = {
  path: "/_/auth/action",
  element: <AuthPresenter />,
};

const router = createBrowserRouter([
  dashboardRoute,
  loginRoute,
  registerRoute,
  authRoute,
  verificationRoute,
  searchRoute,
  notFoundRoute,
  requestResetRoute,
]);

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        globalStyles: () => ({
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
