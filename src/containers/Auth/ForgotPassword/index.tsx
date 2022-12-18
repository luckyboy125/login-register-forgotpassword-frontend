import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { emailReg, errorMsg } from "helpers/const.helper";
import { toast } from "react-toastify";
import { forgotpassword } from "hooks/auth";

const validationSchema = yup.object({
  email: yup.string().required(),
});

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      !emailReg.test(values.email)
        ? toast.error(errorMsg.mail)
        : forgotpassword(values).then(() => {
            history.push("/");
          });
      actions.resetForm({
        values: initialValues,
      });
    },
  });

  return (
    <Row>
      <Col md={6} lg={4} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Forgot Password</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Please input your email.
            </Card.Subtitle>
            <Form className="form" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
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
              <Button type="submit" color="primary" className="w-100">
                Confirm
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

export default ForgotPassword;
