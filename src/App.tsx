import { HeadProvider } from "react-head";
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

import { CustomFonts } from "./components/customFonts/customFontsPresenter";
import AuthPresenter from "./pages/Auth/authPresenter";
import DashboardPresenter from "./pages/Dashboard/dashboardPresenter";
import HomepagePresenter from "./pages/Homepage/homepagePresenter";
import LoginPresenter from "./pages/Login/loginPresenter";
import NotFoundPresenter from "./pages/NotFound/notFoundPresenter";
import RegisterPresenter from "./pages/Register/registerPresenter";
import RequestResetPasswordPresenter from "./pages/RequestResetPassword/requestResetPasswordPresenter";
import VerificationPresenter from "./pages/Verification/verificationPresenter";
import { auth } from "./utils/firebaseConfig";

const queryClient = new QueryClient();

// Handles redirect based on auth state
async function authLoader(on: "authed" | "unauthed" = "authed", to: string) {
  const authPromise = new Promise<string | null>(resolve => {
    onAuthStateChanged(auth, user => {
      if (on === "authed" && user) {
        if (!user.emailVerified) {
          resolve("/verification");
        }
        resolve(to);
      } else if (on === "unauthed" && !user) {
        resolve(to);
      } else {
        resolve(null);
      }
    });
  });
  const redirectTo = await authPromise;
  if (redirectTo) {
    return redirect(redirectTo);
  }
  return null;
}

export const dashboardRoute: RouteObject = {
  path: "/dashboard",
  loader: async () => authLoader("unauthed", "/login"),
  element: <DashboardPresenter />,
};

export const homepageRoute: RouteObject = {
  path: "",
  element: <HomepagePresenter />,
};

export const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFoundPresenter />,
};

export const loginRoute: RouteObject = {
  path: "/login",
  loader: async () => authLoader("authed", "/dashboard"),
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

export const verificationRoute: RouteObject = {
  path: "/verification",
  element: <VerificationPresenter />,
};

export const authRoute: RouteObject = {
  path: "/_/auth/action",
  element: <AuthPresenter />,
};

const router = createBrowserRouter([
  homepageRoute,
  dashboardRoute,
  loginRoute,
  registerRoute,
  authRoute,
  verificationRoute,
  notFoundRoute,
  requestResetRoute,
]);

function App() {
  return (
    <HeadProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          globalStyles: theme => ({
            body: {
              overflowX: "hidden",
            },
            ".mantine-Modal-modal": {
              backgroundColor: theme.colors.dark[6],
            },
          }),
          colors: {
            bittersweet: [
              "#fff1f1",
              "#ffe1e1",
              "#ffc7c8",
              "#ffa0a1",
              "#ff6466",
              "#f83b3d",
              "#e51d20",
              "#c11416",
              "#a01416",
              "#841819",
            ],
            dark: [
              "#c2c2c2",
              "#a8a8a8",
              "#949494",
              "#616161",
              "#383838",
              "#2e2e2e",
              "#212121",
              "#0f0f0f",
              "#0a0a0a",
              "#000000",
            ],
          },
          primaryShade: 5,
          primaryColor: "bittersweet",
          defaultRadius: "md",
          cursorType: "pointer",
          fontFamily: "Satoshi, sans-serif",
        }}
      >
        <CustomFonts />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </HeadProvider>
  );
}

export default App;
