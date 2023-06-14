import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const AddedToCartMessageComponent = () => {
  const [show, setShow] = useState(true);
    return (
      <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>The product was added to your cart!</Alert.Heading>
        <Button variant='success'>Go Back</Button>{" "}
        <Link to="/cart">
            <Button variant='danger'>Go to cart</Button>
        </Link>
      </Alert>
    );
}

export default AddedToCartMessageComponent;