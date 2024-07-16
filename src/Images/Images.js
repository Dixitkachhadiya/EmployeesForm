import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
function Images() {

    const [image, setimage] = useState(null);

    const handlesubmit = async (e) => {
        debugger
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post("http://localhost:1001/uploardImage", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });
            setimage(null);
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <>
            <Container>
                <br></br>
                <Form.Group controlId="formFile">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" value={image} onChange={(e) => setimage(e.target.files[0])} />
                </Form.Group>
                <br></br>
                <Button variant='primary' onClick={handlesubmit}>Submit</Button>
            </Container>
        </>
    )
}
export default Images;