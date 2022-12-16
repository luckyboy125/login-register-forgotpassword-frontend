import React, { Suspense } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";

import { useAppSelector } from "store/hooks";
import { RootState } from "store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "components/Loader";

const Main = React.lazy(() => import("containers/Main"));
const SigninPage = React.lazy(() => import("containers/Auth/SigninPage"));
const SignupPage = React.lazy(() => import("containers/Auth/SignupPage"));
const ErrorBoundary = React.lazy(() => import("components/ErrorBoundary"));

const App = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  console.log("user", user);

  const renderAuth = () => {
    return (
      <Switch>
        <Route exact path="/signin" component={SigninPage}></Route>
        <Route exact path="/signup" component={SignupPage}></Route>

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
              {user.id ? renderMain() : renderAuth()}
            </Container>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
