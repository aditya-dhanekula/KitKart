import Form from 'react-bootstrap/Form';

const AttributesFilterComponent = () => {
    return (
        <>
            <Form.Label>Color</Form.Label>
            <Form.Check type="checkbox" id="default-checkbox" label="green"></Form.Check>
        </>
    )
}

export default AttributesFilterComponent