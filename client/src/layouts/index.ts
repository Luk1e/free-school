// Import lazy load
import { lazyLoadComponent } from "../utils/helpers/LazyLoad";

/* Lazily loaded layouts */
// Public layout
const PublicLayout = lazyLoadComponent(() => import("./PublicLayout"));

// Authorized layout
const AuthorizedLayout = lazyLoadComponent(() => import("./AuthorizedLayout"));

// Export lazy Layouts
export const lazyLayouts = {
  PublicLayout,
  AuthorizedLayout,
};
