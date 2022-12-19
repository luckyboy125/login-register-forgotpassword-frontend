import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { signout } from "store/modules/auth";
import { RootState } from "store/store";

const Main = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLoginOut = () => {
    dispatch(signout());
    window.location.reload();
  };

  return (
    <Row>
      <Col md={6} lg={6} className="mx-auto mt-5">
        <h1>Welcome here!</h1>
        <span className="mb-3 text-muted">{user.email}</span>
        <Button
          type="button"
          color="primary"
          className="w-100 mt-5"
          onClick={handleLoginOut}
        >
          Signout
        </Button>
      </Col>
    </Row>
  );
};

export default Main;
