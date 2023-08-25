import { createContext } from "react";

export type AuthRoutes = "Login" | "Signup";

export const AuthRouteStateContext = createContext<{
  route: AuthRoutes;
  closeModal: () => void;
  setRoute: (route: AuthRoutes) => void;
}>({
  route: "Login",
  closeModal() {},
  setRoute(route) {},
});
