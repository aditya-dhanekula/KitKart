import { Row, Col, Button } from "react-bootstrap"
import Table from 'react-bootstrap/Table'
import AdminLinksComponent from "../../components/admin/AdminLinksComponent"
import { LinkContainer } from "react-router-bootstrap"

const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("User Deleted!")
}

const AdminUsersPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent/>
            </Col>
            <Col md={10}>
                <h1>Users</h1>
                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                    <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>Aditya</td>
                            <td>Dhanekula</td>
                            <td>example@email.com</td>
                            <td><i className={item}></i></td>
                            <td>
                                <LinkContainer to="/admin/edit-user">
                                    <Button className="btn-sm">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </LinkContainer>
                                {"  /  "}
                                <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                                    <i className="bi bi-x-circle"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminUsersPage