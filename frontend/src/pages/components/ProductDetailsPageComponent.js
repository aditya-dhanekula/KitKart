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
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewApiRequest,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);

  const messageEndRef = useRef(null);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  useEffect(() => {
    if (product.images) {
      var options = {
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };
      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  });

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "Review created") {
            setProductReviewed("You successfully reviewed the product!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      ></AddedToCartMessageComponent>
      <Row className="mt-5">
        {loading ? (
          <h2>Loading Product Details ....</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              {product.images
                ? product.images.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          fluid
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />
                      ({product.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      Status: {product.count > 0 ? "In Stock" : "Out of Stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price: <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Quantity:
                      <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="default select example"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} variant="danger">
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mt-5">
                  <h5>REVIEWS</h5>
                  <ListGroup variant="flush">
                    {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.name}
                          <br />
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          ></Rating>
                          <br />
                          {review.createdAt.substring(0, 10)} <br />
                          {review.comment}
                          <br />
                        </ListGroup.Item>
                      ))}
                    <div ref={messageEndRef} />
                  </ListGroup>
                </Col>
              </Row>
              <hr />
              <span className="fw-bold">Send Review Form</span>
              {!userInfo.name && (
                <Alert variant="danger">Login first to write a review</Alert>
              )}

              <Form onSubmit={sendReviewHandler}>
                <FormGroup
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Write a review</Form.Label>
                  <Form.Control
                    name="comment"
                    required
                    disabled={!userInfo.name}
                    as="textarea"
                    rows={3}
                  ></Form.Control>
                </FormGroup>
                <Form.Select
                  name="rating"
                  required
                  disabled={!userInfo.name}
                  aria-label="Default Select example"
                >
                  <option value="">Your Rating</option>
                  <option value="5">5 (Very Good)</option>
                  <option value="4">4 (Good)</option>
                  <option value="3">3 (Average)</option>
                  <option value="2">2 (Bad)</option>
                  <option value="1">1 (Very Bad)</option>
                </Form.Select>
                <Button
                  type="submit"
                  disabled={!userInfo.name}
                  className="mt-3 mb-3"
                  variant="primary"
                >
                  Submit Review
                </Button>
                <br />
                {productReviewed}
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
