import { Row, Col } from "react-bootstrap"
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

const UserOrdersPage = () => {
    return (
        <Row className="m-5">
            <Col md={12}>
                <h1>My Orders</h1>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Delivered</th>
                    <th>Order Details</th>
                    </tr>
                </thead>
                <tbody>
                    {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>Aditya Dhanekula</td>
                            <td>16-06-2023</td>
                            <td>$234</td>
                            <td><i className={item}></i></td>
                            <td><Link to="/user/order-details">View Details</Link></td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default UserOrdersPage