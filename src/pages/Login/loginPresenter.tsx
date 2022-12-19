import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import SEO from "~/components/seo/seo";
import { auth } from "~/utils/firebaseConfig";

import { dashboardRoute } from "../../App";
import LoginView from "./loginView";

export interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");
  const changeAccountSettings = searchParams.get("changeAccountSettings");

  const successMsg = verified
    ? "Email verified successfully! You can now log in."
    : reset
    ? "Password reset successfully! You can now log in."
    : changeAccountSettings
    ? "To change your account settings, please log in again"
    : undefined;

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  function handleSubmit(values: LoginFormValues) {
    signInWithEmailAndPassword(values.email, values.password);
  }

  useEffect(() => {
    if (user && user.user.emailVerified) {
      navigate(dashboardRoute.path || "/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <SEO title="Log in" description="Log in to GameSquad" />
      <LoginView onSubmit={handleSubmit} loading={loading} error={error} successMsg={successMsg} />
    </>
  );
}
