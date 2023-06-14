import Form from 'react-bootstrap/Form';

const AttributesFilterComponent = () => {
    return (
        <>
            {[{Color: ["Red", "Blue", "Green"]}, {RAM: ["2 GB", "4 GB", "8 GB", "16 GB"]}].map((item, idx) => (
                <div key={idx} className='mb-3'>
                    <Form.Label><b>{Object.keys(item)}</b></Form.Label>
                    {item[Object.keys(item)].map((i, idx)=>(
                        <Form.Check key={idx} type="checkbox" id="default-checkbox" label={i}></Form.Check>
                    ))}
                </div>
                
            ))}
        </>
    )
}

export default AttributesFilterComponent