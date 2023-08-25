import { User, onAuthStateChanged, type Auth } from "firebase/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps extends PropsWithChildren {
  auth: Auth;
}

export default function AuthProvider({ auth, children }: AuthProviderProps) {
  const [userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUserState);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
}
