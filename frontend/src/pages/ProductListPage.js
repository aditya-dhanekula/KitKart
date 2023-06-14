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

const ProductListPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}><ListGroup>
                    <ListGroup.Item><SortOptionsComponent/></ListGroup.Item>
                    <ListGroup.Item><PriceFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><RatingFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><CategoryFilterComponent/></ListGroup.Item>
                    <ListGroup.Item><AttributesFilterComponent/></ListGroup.Item>
                    <ListGroupItem>
                        <Button variant="primary">Primary</Button>
                        <Button variant="danger">Danger</Button>
                    </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    <ProductForListComponent/>
                    <PaginationComponent/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductListPage