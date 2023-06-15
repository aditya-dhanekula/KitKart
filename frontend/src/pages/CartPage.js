import {Row, Col, Container, Alert, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import CartItemComponent from '../components/CartItemComponent'

const CartPage = () => {
    return (
        <Container fluid>
            <Row className='mt-4'>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    <ListGroup variant='flush'>
                        {Array.from({length: 3}).map((item, idx) => (
                            <CartItemComponent key={idx}/>
                        ))}
                    </ListGroup>
                <Alert variant="info">Your cart is empty</Alert>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroupItem>
                            <h3>Subtotal (2 Items)</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: <span className='fw-bold'>$892</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <LinkContainer to="/user/cart-details">
                                <Button type='button'>Proceed To Checkout</Button>
                            </LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default CartPage