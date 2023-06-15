import { Col, Container, Row, Form, Button, CloseButton, Table, Alert, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"

const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(2.7)"
}

const AdminEditProductPage = () => {
    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropogation();
        }
        setValidated(true)
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">Go Back</Link>
                </Col>
                <Col md={6}>
                    <h1>Edit Product</h1>
                    <Form nonValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue="Panasonic" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="description" required as="textarea" rows={3} defaultValue="Product Description"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in Stock</Form.Label>
                            <Form.Control name="count" required type="number" defaultValue="2"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" defaultValue="$123"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Select required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                <option value="1">Laptops</option>
                                <option value="2">TV</option>
                                <option value="3">Games</option>
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Choose Attribute</Form.Label>
                                    <Form.Select name="attr-key" aria-label="Default select example">
                                        <option value="">Choose Attribute</option>
                                        <option value="red">Color</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Choose Attribute Value</Form.Label>
                                    <Form.Select name="attrVal" aria-label="Default select example">
                                        <option value="">Choose Attribute Value</option>
                                        <option value="red">Color</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>attr value</td>
                                        <td><CloseButton/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create New Attribute</Form.Label>
                                    <Form.Control disabled={false} placeholder="First choose a category" name="newAttribute" type="text" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                                    <Form.Label>Attribute Value</Form.Label>
                                    <Form.Control disabled={false} name="newAttrValue" placeholder="First choose a category" required={true} type="text" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Alert variant="primary">
                            After typing attribute key and value press enter on one of the field
                        </Alert>

                        <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                            <Form.Label>Images</Form.Label>
                            <Row>
                                <Col style={{position: "relative"}} xs={3}>
                                    <Image src="/images/monitors-category.png" fluid/>
                                    <i style={onHover} className="bi bi-x text-danger"></i>
                                </Col>
                                <Col style={{position: "relative"}} xs={3}>
                                    <Image src="/images/tablets-category.png" fluid/>
                                    <i style={onHover} className="bi bi-x text-danger"></i>
                                </Col>
                                <Col style={{position: "relative"}} xs={3}>
                                    <Image src="/images/games-category.png" fluid/>
                                    <i style={onHover} className="bi bi-x text-danger"></i>
                                </Col>
                            </Row>
                            <br/>
                            <Form.Control required type="file" multiple/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditProductPage