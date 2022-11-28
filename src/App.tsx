import { MantineProvider, Text } from "@mantine/core";
import {
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import Login from "./pages/Login";

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

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </MantineProvider>
  );
}

export default App;
