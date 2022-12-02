import { MantineProvider, Text } from "@mantine/core";
import {
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import Login from "./pages/Login/loginView";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => <Text>Welcome</Text>,
});

const loginRoute = rootRoute.createRoute({
  path: "/login",
  component: Login,
});

const routeConfig = rootRoute.addChildren([indexRoute, loginRoute]);

const router = createReactRouter({ routeConfig });

const app = initializeApp(firebaseConfig);

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
