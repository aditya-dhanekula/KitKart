import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Button from 'react-bootstrap/Button'
import SortOptionsComponent from '../components/SortOptionsComponent'
import PriceFilterComponent from '../components/filterQueryResultOptions/PriceFilterComponent';
import RatingFilterComponent from '../components/filterQueryResultOptions/RatingFilterComponent';
import CategoryFilterComponent from '../components/filterQueryResultOptions/CategoryFilterComponent';
import AttributesFilterComponent from '../components/filterQueryResultOptions/AttributesFilterComponent';
import ProductForListComponent from '../components/ProductForListComponent';
import PaginationComponent from '../components/PaginationComponent';

import axios from "axios";

const ProductListPage = () => {
    axios.get("/api/products").then((res) => console.log(res))
    return (
        <Container fluid>
            <Row>
                <Col md={3}><ListGroup>
                    <ListGroup.Item className='mb-3 mt-3'><SortOptionsComponent/></ListGroup.Item>
                    <ListGroup.Item><span className='fw-bold'>Filter</span><br/><PriceFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><RatingFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><CategoryFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><AttributesFilterComponent/></ListGroup.Item>
                    <ListGroupItem>
                        <Button variant="primary">Filter</Button>{" "}
                        <Button variant="danger">Reset filters</Button>
                    </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {Array.from({length: 5}).map((_, idx) => (
                        <ProductForListComponent key={idx} images={["games", "monitors", "tablets", "games", "monitors"]} idx={idx}/>
                    ))}
                    <PaginationComponent/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductListPage