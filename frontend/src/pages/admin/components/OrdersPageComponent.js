import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";

const OrdersPageComponent = ({ fetchOrders }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrders(abctrl)
      .then((res) => setOrders(res))
      .catch((er) =>
        console.log(
          "Error in fetching orders in useEffect method of OrdersPageComponent"
          //er.response.data.message ? er.response.data.message : er.response.data
        )
      );

    return () => abctrl.abort();
  }, []);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td> {order.user.name} {order.user.lastName} </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${order._id}`}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default OrdersPageComponent;
