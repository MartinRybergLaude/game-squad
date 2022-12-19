import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import SEO from "~/components/seo/seo";
import { auth } from "~/utils/firebaseConfig";

import { verificationRoute } from "../../App";
import RegisterView from "./registerView";

export interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPresenter() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);

  // Sends email verificaton on user creation
  useEffect(() => {
    if (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMsg("That email is already in use.");
      } else {
        setErrorMsg("There was an unexpected error");
      }
    }
    async function sendVerificationEmail() {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        navigate(verificationRoute.path || "/verification");
      }
    }
    if (user && !user.user.emailVerified) {
      sendVerificationEmail();
    }
  }, [user, error]);

  async function handleSubmit(values: RegisterFormValues) {
    createUserWithEmailAndPassword(values.email, values.password);
  }

  return (
    <>
      <SEO title="Register" description="Register a GameSquad account" />
      <RegisterView
        onSubmit={handleSubmit}
        loading={loading || sending}
        error={errorMsg || emailError?.message}
      />
    </>
  );
}
