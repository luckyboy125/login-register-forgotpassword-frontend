import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { emailReg, errorMsg, passwordReg } from "helpers/const.helper";
import { toast } from "react-toastify";
import { signup } from "hooks/auth";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
};

const SignupPage = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      !emailReg.test(values.email)
        ? toast.error(errorMsg.mail)
        : !passwordReg.test(values.password)
        ? toast.error(errorMsg.password)
        : signup(values).then(() => {
            history.push("/signup/changeemail", { data: values.email });
          });
      actions.resetForm({ values: initialValues });
    },
  });

  return (
    <Row>
      <Col md={6} lg={4} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Sign up</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Please input your credentials.
            </Card.Subtitle>
            <Form className="form" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="example@gmail.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="********"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" color="primary" className="w-100">
                Sign up
              </Button>
            </Form>
            <Link to="/signin" className="d-block my-2 text-center">
              Go to Sign in Page
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignupPage;
