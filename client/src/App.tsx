import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import GlobalStyle from "./styles/GlobalStyles";
import { Header, Footer } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { StateType, DispatchType } from "./store/store";
import { authenticate } from "./toolkit/auth/authSlice";
import { useTranslation } from "react-i18next";

function App() {
  const dispatch: DispatchType = useDispatch();
  const { i18n } = useTranslation();
  const authSlice = useSelector((state: StateType) => state.authentication);
  const { user, isLoading } = authSlice;

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <span style={{ display: "contents" }} className={i18n.language}>
          <GlobalStyle />
          <Header />
          <Router user={user} loading={isLoading} />
          <Footer />
        </span>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
