import { useRoutes } from "react-router-dom";
import RouterProps from "./RouterProps";

import PublicRoutes from "./publicRoutes";
import AuthorizedRoutes from "./authorizedRoutes";

// Export global router
export default function Router({ user, loading }: RouterProps) {
  return useRoutes([PublicRoutes(), AuthorizedRoutes({ user, loading })]);
}
