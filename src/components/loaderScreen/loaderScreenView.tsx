import { Loader } from "@mantine/core";

export default function LoaderScreenView() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size="xl" />
    </div>
  );
}
