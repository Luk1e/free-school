// Import lazy load
import { lazyLoadComponent } from "../../utils/helpers/LazyLoad";

/* Lazily loaded pages */
// Home
const HomePage = lazyLoadComponent(() => import("../app/home/HomePage"));

// Authorization
const LoginPage = lazyLoadComponent(() => import("../app/login/LoginPage"));

// About
const RegisterPage = lazyLoadComponent(
  () => import("../app/register/RegisterPage")
);

// Error
const ErrorPage = lazyLoadComponent(() => import("../app/error/ErrorPage"));

// Export lazy Public pages
export const lazyPublicPages = {
  HomePage,
  LoginPage,
  RegisterPage,
  ErrorPage,
};
