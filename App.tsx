import AuthProvider, { AuthContext } from "./components/AuthProvider";
import { auth } from "./firebase/auth";
import AuthScreen from "./screens/Auth";
import { useContext } from "react";
import AppScreen from "./screens/App";

export default function AppContainer() {
  return (
    <AuthProvider auth={auth}>
      <AppNavigation />
    </AuthProvider>
  );
}
function AppNavigation() {
  const user = useContext(AuthContext);

  return user ? <AppScreen /> : <AuthScreen />;
}
