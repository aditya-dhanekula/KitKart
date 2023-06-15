import { Container, Row, Col, Form, Alert, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import CartItemComponent from '../../components/CartItemComponent'

const UserCartDetailsPage = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Cart Details</h1>
                <Col md={8}>
                    <br/>
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: Aditya Dhanekula <br/>
                            <b>Address</b>: 8739 Mayflower St. Los Angeles, CA 90063<br/>
                            <b>Phone</b>: 2972328192
                        </Col>
                        <Col md={6}>
                        <h2>Payment Method</h2>
                        <Form.Select>
                            <option value="pp">
                                PayPal
                            </option>
                            <option value="cod">
                                Cash on Delivery (Delivery may be delayed)
                            </option>
                        </Form.Select>
                        </Col>
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">
                                    Not Delivered. In order to place an order, complete filling your profile with accurate details.
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Not paid yet
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br/> 
                    <h2>Cart Items</h2>
                    <ListGroup variant="flush">
                        {Array.from({length: 3}).map((item, idx)=>(
                            <CartItemComponent key={idx}></CartItemComponent>
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
                                <Button size="lg" variant="danger" type="button">Pay Now</Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default UserCartDetailsPage