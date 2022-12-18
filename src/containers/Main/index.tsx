import React from "react";
import { Row, Col } from "react-bootstrap";
import { useAppSelector } from "store/hooks";
import { RootState } from "store/store";

const Main = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <Row>
      <Col md={6} lg={6} className="mx-auto mt-5">
        <h1>Welcome here!</h1>
        <span className="mb-3 text-muted">{user.email}</span>
      </Col>
    </Row>
  );
};

export default Main;
