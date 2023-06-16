import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Rating } from 'react-simple-star-rating';
import {Row, Col} from 'react-bootstrap'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const ProductForListComponent = ({images, idx}) => {
    return (
        <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Row>
                <Col lg={5}>
                    <Card.Img crossOrigin="anonymous" variant="top" src={"/images/" + images[idx] + "-category.png"} />
                </Col>
                <Col lg={7}>
                <Card.Body>
                    <Card.Title>Samsung Galaxy Tab S7</Card.Title>
                    <Card.Text>
                    Samsung Galaxy Tab S7 is officially released on Aug. 21.
                    The tablet comes in three different colors such as Mystic Black, Mystic Bronze, and Mystic Silver. 
                    It is fueled by a Non-removable Li-Po 8000 mAh battery + Fast charging 45W. 
                    The tablet comes in a dimension of 253.8 x 165.3 x 6.3 mm and 498 grams.
                    </Card.Text>
                    <Card.Text>
                        <Rating readonly size={20} initialValue={5}/> (1)
                    </Card.Text>
                    <Card.Text className='h4'>
                        $124{" "}
                        <LinkContainer to="/product-details">
                            <Button variant="danger">See Product</Button>
                        </LinkContainer>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default ProductForListComponent