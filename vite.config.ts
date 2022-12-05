import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    tsconfigPaths(),
    svgr({
      exportAsDefault: false,
    }),
  ],
});
