import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const UserOrderDetailsPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: Aditya Dhanekula <br />
              <b>Address</b>: 8739 Mayflower St. Los Angeles, CA 90063
              <br />
              <b>Phone</b>: 2972328192
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select disabled={false}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash on Delivery (Delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not Delivered
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Paid on 02-11-2023
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {Array.from({ length: 3 }).map((item, idx) => (
              <CartItemComponent
                item={{
                  image: { path: "/images/tablets-category.png" },
                  name: "Product name",
                  price: 10,
                  count: 10,
                  quantity: 5,
                }}
                key={idx}
              ></CartItemComponent>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem>
              <h3>Order Summary</h3>
            </ListGroupItem>
            <ListGroupItem>
              Items Price (After tax): <span className="fw-bold">$62</span>
            </ListGroupItem>
            <ListGroupItem>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroupItem>
            <ListGroupItem>
              Tax: <span className="fw-bold">Included</span>
            </ListGroupItem>
            <ListGroupItem className="text-danger">
              Total Price (After tax): <span className="fw-bold">$62</span>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" type="button">
                  Complete Payment
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPage;
