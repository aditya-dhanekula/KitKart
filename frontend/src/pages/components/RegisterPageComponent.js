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
import { Link } from "react-router-dom";

const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);

  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true)
    } else {
      setPasswordsMatchState(false)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      name &&
      lastName &&
      password &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((er) =>
          setRegisterUserResponseState({
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
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Password and confirm password must match
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password must contain atleast 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repeat password"
                name="confirmPassword"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords must match
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to="/login">Login</Link>
              </Col>
            </Row>
            <Button type="submit" className="mb-3">
              Submit{" "}
              {registerUserResponseState &&
              registerUserResponseState.loading === true ? (
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
                registerUserResponseState &&
                registerUserResponseState.error === "User already exists"
              }
              variant="danger"
            >
              User with that email already exists!
            </Alert>
            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.success === "User created"
              }
              variant="info"
            >
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
