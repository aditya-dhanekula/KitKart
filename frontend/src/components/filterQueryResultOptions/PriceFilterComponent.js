import { Form } from 'react-bootstrap'

const PriceFilterComponent = ({ price, setPrice }) => {
    return (
        <>
            <Form.Label>
                <span className='fw-bold'>Price no greater than: </span> {price}$
            </Form.Label>
            <Form.Range min={0} max={3000} step={30} onChange={(e) => setPrice(e.target.value)} ></Form.Range>
        </>
    )
}

export default PriceFilterComponent