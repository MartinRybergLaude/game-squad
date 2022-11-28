import { MantineProvider, Text } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>GameSquad</Text>
    </MantineProvider>
  );
}

export default App;
