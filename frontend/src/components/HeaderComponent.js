import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import {Link} from 'react-router-dom'

import { logout } from "../redux/actions/userActions"
import { useDispatch } from "react-redux"

const HeaderComponent = () => {
    const dispatch = useDispatch()
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <InputGroup>
                            <DropdownButton id="dropdown-basic-button" title="All">
                                <Dropdown.Item>Electronics</Dropdown.Item>
                                <Dropdown.Item>Books</Dropdown.Item>
                                <Dropdown.Item>Cars</Dropdown.Item>
                            </DropdownButton>
                            <Form.Control type="text" placeholder="Search in shop ..." />
                            <Button variant="warning">
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/admin/orders">
                            <Nav.Link> 
                                <Badge pill bg="primary">2</Badge>
                                <span className='ms-1'>Admin</span>
                            </Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Aditya" id="collasible-nav-dropdown">
                        <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => dispatch(logout())} >Logout</NavDropdown.Item>
                        </NavDropdown>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <Badge bg="success">3</Badge>
                                <span className='ms-1'></span>
                                <i className="bi bi-cart2"></i>
                                <span className='ms-1'>CART</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent