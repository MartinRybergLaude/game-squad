import { Loader } from "@mantine/core";
import { motion } from "framer-motion";

interface LoaderScreenViewProps {
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function LoaderScreenView({ spinnerSize }: LoaderScreenViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        zIndex: 1000,
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size={spinnerSize || "xl"} />
    </motion.div>
  );
}
