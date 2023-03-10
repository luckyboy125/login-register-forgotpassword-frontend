import React, { Suspense, useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "components/Loader";
import { signinWithToken } from "store/modules/auth";
import { storageConst } from "helpers/const.helper";

const Main = React.lazy(() => import("containers/Main"));
const SigninPage = React.lazy(() => import("containers/Auth/SigninPage"));
const ChangeEmail = React.lazy(() => import("containers/Auth/ChangeEmail"));
const ForgotPassword = React.lazy(
  () => import("containers/Auth/ForgotPassword")
);
const ChangePassword = React.lazy(
  () => import("containers/Auth/ChangePassword")
);
const SignupPage = React.lazy(() => import("containers/Auth/SignupPage"));
const SignupPageVerify = React.lazy(
  () => import("containers/Auth/SignupPageVerify")
);
const ErrorBoundary = React.lazy(() => import("components/ErrorBoundary"));

const App = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const init = async () => {
    const token = await AsyncLocalStorage.getItem(storageConst);
    token !== null && dispatch(signinWithToken({ token: token }));
  };

  useEffect(() => {
    init();
  }, []);

  const renderAuth = () => {
    return (
      <Switch>
        <Route exact path="/signin" component={SigninPage}></Route>
        <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
        <Route
          exact
          path="/forgotpassword/verify/:tokenId"
          component={ChangePassword}
        ></Route>
        <Route exact path="/signup" component={SignupPage}></Route>
        <Route exact path="/signup/changeemail" component={ChangeEmail}></Route>
        <Route
          exact
          path="/signup/verify/:tokenId"
          component={SignupPageVerify}
        ></Route>

        <Redirect to="/signin" />
      </Switch>
    );
  };

  const renderMain = () => {
    return (
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Container fluid className="p-0">
              {user?.id ? renderMain() : renderAuth()}
            </Container>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
