import { Global } from "@mantine/core";

import normal from "./Satoshi-Variable.woff2";
import italic from "./Satoshi-VariableItalic.woff2";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${normal}') format("woff2")`,
            fontWeight: "300 900",
            fontDisplay: "swap",
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${italic}') format("woff2")`,
            fontWeight: "300 900",
            fontDisplay: "swap",
            fontStyle: "italic",
          },
        },
      ]}
    />
  );
}
