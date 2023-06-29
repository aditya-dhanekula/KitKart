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

const RegisterPageComponent = ({ registerUserApiRequest }) => {
  const [validated, setValidated] = useState(false);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
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
      name && lastName &&
      password
    ) {
      registerUserApiRequest(name, lastName, email, password)
        .then((res) => console.log(res))
        .catch((er) =>
          console.log({
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
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
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
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
            <Alert show={true} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={true} variant="info">
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;