import { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { verificationRoute } from "../../App";
import { auth } from "../../firebaseConfig";
import RegisterView from "./registerView";

export interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPresenter() {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);

  // Sends email verificaton on user creation
  useEffect(() => {
    async function sendVerificationEmail() {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        navigate(verificationRoute.path || "/verification");
      }
    }
    if (user && !user.user.emailVerified) {
      sendVerificationEmail();
    }
  }, [user]);

  async function handleSubmit(values: RegisterFormValues) {
    createUserWithEmailAndPassword(values.email, values.password);
  }

  return (
    <RegisterView
      onSubmit={handleSubmit}
      loading={loading || sending}
      error={error?.message || emailError?.message}
    />
  );
}
