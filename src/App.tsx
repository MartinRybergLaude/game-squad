import { MantineProvider, Text } from "@mantine/core";
import {
  createReactRouter,
  createRouteConfig,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => <Text>Index</Text>,
});

const loginRoute = rootRoute.createRoute({
  path: "/login",
  component: () => <Text>Login</Text>,
});

const routeConfig = rootRoute.addChildren([indexRoute, loginRoute]);

const router = createReactRouter({ routeConfig });

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router}>
        <Text>GameSquad</Text>
      </RouterProvider>
    </MantineProvider>
  );
}

export default App;
