import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { loginRoute, verificationRoute } from "../../App";
import { auth } from "../../firebaseConfig";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate(loginRoute.path ?? "/login");
    return null;
  }

  if (user && !user.emailVerified) {
    navigate(verificationRoute.path ?? "/verification");
  }
  return <>{children}</>;
}
