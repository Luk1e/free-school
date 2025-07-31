import { Outlet } from "react-router-dom";
import Loader from "../components/loader/Loader";
import LoginPage from "../pages/app/login/LoginPage";

interface AuthLayoutProps {
  user?: any;
  loading?: boolean;
}

function AuthorizedLayout({ user, loading }: AuthLayoutProps) {
  return (
    <>
      {loading ? (
        <Loader color={"darkmagenta"} />
      ) : user ? (
        <>
          <Outlet />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default AuthorizedLayout;
