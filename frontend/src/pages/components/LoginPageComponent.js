import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPageComponent = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          if(res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn))
          }

          if (res.success === "User logged in" && !res.userLoggedIn.isAdmin) {
            window.location.href = "/user"
          } else {
            window.location.href = "/admin/orders"
          }
        })
        .catch((er) =>
          setLoginUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDoNotLogout">
              <Form.Check
                type="checkbox"
                name="doNotLogout"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't have an account already?
                <Link to="/register">Register</Link>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mb-3">
              Login{" "}
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
            </Button>
            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "Wrong credentials"
              }
              variant="danger"
            >
              Wrong Credentials!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
