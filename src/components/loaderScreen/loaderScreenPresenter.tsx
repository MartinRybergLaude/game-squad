import LoaderScreenView from "./loaderScreenView";

interface LoaderScreenPresenterProps {
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function LoaderScreenPresenter({ spinnerSize }: LoaderScreenPresenterProps) {
  return <LoaderScreenView spinnerSize={spinnerSize} />;
}
