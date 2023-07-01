import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({
  productID,
  orderCreated,
  quantity,
  price,
  removeFromCartHandler,
}) => {
  return (
    <Button
      disabled={orderCreated}
      hidden={orderCreated}
      type="button"
      variant="secondary"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
        <i className="bi bi-trash"></i>
    </Button>
  );
};

export default RemoveFromCartComponent
