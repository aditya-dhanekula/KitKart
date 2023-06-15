import { Fragment, useState } from 'react'
import { Toast, Form, Button } from 'react-bootstrap'

const AdminChatRoomComponent = () => {
    const [toast1, closeToast1] = useState(true)
    const close1 = () => closeToast1(false)
    const [toast2, closeToast2] = useState(true)
    const close2 = () => closeToast2(false)
    return (
        <>
            <Toast show={toast1} onClose={close1} className='ms-4 mb-5'>
                <Toast.Header>
                    <strong className='me-auto'>Chat with Prakhar</strong>
                </Toast.Header>
                <Toast.Body>
                    <div style={{maxHeight: "400px", overflow: "auto"}}>
                        {Array.from({length: 30}).map((_, idx) => (
                            <Fragment key={idx}>
                                <p className='bg-primary p-3 ms-4 text-light rounded-pill'><b>User wrote:</b> Hello World! This is a chat message.</p>
                                <p><b>Admin wrote:</b> Hello World! This is a chat message.</p>
                            </Fragment>
                        ))}
                    </div>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Write a Message</Form.Label>
                            <Form.Control as="textarea" rows={2}></Form.Control>
                        </Form.Group>
                        <Button variant='success' type='submit'>Send</Button>
                    </Form>
                </Toast.Body>
            </Toast>

            <Toast show={toast2} onClose={close2} className='ms-4 mb-5'>
                <Toast.Header>
                    <strong className='me-auto'>Chat with Aditya</strong>
                </Toast.Header>
                <Toast.Body>
                    <div style={{maxHeight: "400px", overflow: "auto"}}>
                        {Array.from({length: 30}).map((_, idx) => (
                            <Fragment key={idx}>
                                <p className='bg-primary p-3 ms-4 text-light rounded-pill'><b>User wrote:</b> Hello World! This is a chat message.</p>
                                <p><b>Admin wrote:</b> Hello World! This is a chat message.</p>
                            </Fragment>
                        ))}
                    </div>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Write a Message</Form.Label>
                            <Form.Control as="textarea" rows={2}></Form.Control>
                        </Form.Group>
                        <Button variant='success' type='submit'>Send</Button>
                    </Form>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default AdminChatRoomComponent