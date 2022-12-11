import { Loader } from "@mantine/core";

interface LoaderScreenViewProps {
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function LoaderScreenView({ spinnerSize }: LoaderScreenViewProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size={spinnerSize || "xl"} />
    </div>
  );
}
