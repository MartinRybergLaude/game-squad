import { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { dashboardRoute } from "../../App";
import { auth } from "../../firebaseConfig";
import RegisterView from "./registerView";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
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
        navigate(dashboardRoute.path);
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
