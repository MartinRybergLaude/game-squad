import { MantineProvider, Text } from "@mantine/core";
import {
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import { initializeApp } from "firebase/app";
import { atom } from "jotai";
import { firebaseConfig } from "./firebaseConfig";
import DashboardView from "./pages/Dashboard/dashboardView";
import LoginPresenter from "./pages/Login/loginPresenter";
import LoginView from "./pages/Login/loginView";
import RegisterPresenter from "./pages/Register/registerPresenter";
import RegisterView from "./pages/Register/registerView";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => <Text>Welcome</Text>,
});

export const loginRoute = rootRoute.createRoute({
  path: "/login",
  component: LoginPresenter,
});

export const registerRoute = rootRoute.createRoute({
  path: "/register",
  component: RegisterPresenter,
});

export const dashboardRoute = rootRoute.createRoute({
  path: "/dashboard",
  component: DashboardView,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
]);

const router = createReactRouter({ routeConfig });

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
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </MantineProvider>
  );
}

export default App;
