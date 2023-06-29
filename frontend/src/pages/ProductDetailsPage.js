import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Button,
  Form,
  Alert,
  FormGroup,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsPage = () => {
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        console.log("Before Dispatch")
        dispatch(addToCart())
    }

  var options = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
  };
  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options);
    new ImageZoom(document.getElementById("second"), options);
    new ImageZoom(document.getElementById("third"), options);
    new ImageZoom(document.getElementById("fourth"), options);
  });
  return (
    <Container>
      <AddedToCartMessageComponent></AddedToCartMessageComponent>
      <Row className="mt-5">
        <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image
              crossOrigin="anonymous"
              fluid
              src="/images/games-category.png"
            ></Image>
          </div>
          <br />
          <div id="second">
            <Image fluid src="/images/monitors-category.png"></Image>
          </div>
          <br />
          <div id="third">
            <Image fluid src="/images/tablets-category.png"></Image>
          </div>
          <br />
          <div id="fourth">
            <Image fluid src="/images/games-category.png"></Image>
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product Name</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} />
                  (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Porta ac consectetur ac ehfuw cwsbfiw sbvbsiwif whuifs
                  uofuswfbs visubviusb
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: In Stock</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <Form.Select size="lg" aria-label="default select example">
                    <option>1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    Aditya Dhanekula
                    <br />
                    <Rating readonly size={20} initialValue={4}></Rating>
                    <br />
                    20-01-2023 <br />
                    I recently dined at the place and was thoroughly impressed
                    by both the exquisite cuisine and the impeccable service.
                    The menu showcased a variety of innovative dishes, blending
                    bold flavors and beautiful presentation. The attentive and
                    knowledgeable staff ensured that our meal was a memorable
                    one, providing excellent recommendations and ensuring our
                    satisfaction.
                    <br />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <span className="fw-bold">Send Review Form</span>
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3}></Form.Control>
            </FormGroup>
            <Form.Select aria-label="Default Select example">
              <option>Your Rating</option>
              <option value="5">5 (Very Good)</option>
              <option value="4">4 (Good)</option>
              <option value="3">3 (Average)</option>
              <option value="2">2 (Bad)</option>
              <option value="1">1 (Very Bad)</option>
            </Form.Select>
            <Button className="mt-3 mb-3" variant="primary">
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
