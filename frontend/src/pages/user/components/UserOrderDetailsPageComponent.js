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
import CartItemComponent from "../../../components/CartItemComponent";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadPayPalScript,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const paypalContainer = useRef();
  console.log(paypalContainer);

  const { id } = useParams();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          state: data.state,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        if(data.isDelivered){
          setIsDelivered(data.deliveredAt)
          setOrderButtonMessage("Order Finished");
        } else {
          setIsDelivered(false);
        }
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Order Finished");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Complete payment");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("Pay on delivery");
          }
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage("To pay, click one of the buttons below");
      if (!isPaid) {
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Payment Successful");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.country} {userAddress.zipCode}
              <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash on Delivery (Delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Delivered at {isDelivered}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isPaid ? "success" : "danger"}
                >
                  {isPaid ? <>Paid on {isPaid}</> : <>Not yet Paid</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent
                item={item}
                key={idx}
                orderCreated={true}
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
              Items Price (After tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroupItem>
            <ListGroupItem>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroupItem>
            <ListGroupItem>
              Tax: <span className="fw-bold">Included</span>
            </ListGroupItem>
            <ListGroupItem className="text-danger">
              Total Price (After tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-grid gap-2">
                <Button
                  onClick={orderHandler}
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
