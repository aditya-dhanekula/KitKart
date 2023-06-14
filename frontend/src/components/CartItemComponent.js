import { ListGroupItem, Row, Col, Image, Form, Button } from "react-bootstrap"

const CartItemComponent = () => {
    return (
        <>
            <ListGroupItem>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin='anonymous' src="/images/games-category.png" fluid></Image>
                    </Col>
                    <Col md={2}>
                        Logitech Series <br/>
                        Gaming Mouse
                    </Col>
                    <Col md={2}>
                        <b>$67</b>
                    </Col>
                    <Col md={3}>
                        <Form.Select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Button type="button" variant="secondary" onClick={() => window.confirm("Are you sure?")}><i className="bi bi-trash"></i></Button>
                    </Col>
                </Row>
            </ListGroupItem>
            <br/>
        </>
    )
}

export default CartItemComponent