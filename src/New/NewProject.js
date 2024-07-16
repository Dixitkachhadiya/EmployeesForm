import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Button, Container, Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'

function NewProject() {
    const [validated, setValidated] = useState(false);
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [Password, setPassword] = useState("");
    const [Cpassword, setCpassword] = useState("");


    const handleClick = async () => {
        debugger
        if (fname === "") {
            Swal.fire({
                title: "Error",
                text: "Please Enter Frist Name",
                icon: "error"
            });
        } else if (lname === "") {
            Swal.fire({
                title: "Error",
                text: "Please Enter Last Name",
                icon: "error"
            });
        } else if (email === "") {
            Swal.fire({
                title: "Error",
                text: "Please Enter Valid Email",
                icon: "error"
            });
        } else if (Password === "") {
            Swal.fire({
                title: "Error",
                text: "Please Enter Password",
                icon: "error"
            });
        } else if (Cpassword === "") {
            Swal.fire({
                title: "Error",
                text: "Please Enter Confirem Password",
                icon: "error"
            });
        } else if (Password !== Cpassword) {
            Swal.fire({
                title: "Error",
                text: "Your Password And Confirem Password Are not Match",
                icon: "error"
            });
        } else {
            try {
                const data = {
                    Fname: fname,
                    Lname: lname,
                    Email: email,
                    Password: Password,
                    Cpassword: Cpassword
                }
                const res = await axios.post("https://student-info-api.vercel.app/insertRegisterData", data);
                setfname("");
                setlname("");
                setemail("");
                setCpassword("");
                setPassword("");
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <>

                    <div style={{ position: 'relative', height: '100vh' }}>
                        <Spline
                            className=''
                            scene="https://prod.spline.design/EBJ3Oata3NEE2x52/scene.splinecode"
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                        />

                        <Container style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                // background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(1px)',
                                padding: '20px',
                                borderRadius: '10px',
                                width: '100%',
                                maxWidth: '600px'
                            }}>
                                <Form noValidate validated={validated} style={{ color: 'white' }}>
                                    <h1>Registraion Form</h1>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="First name"
                                                value={fname}
                                                onChange={(e) => setfname(e.target.value)}

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Last name"
                                                value={lname}
                                                onChange={(e) => setlname(e.target.value)}

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Username"
                                                    aria-describedby="inputGroupPrepend"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a username.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="Password" placeholder="Password" required value={Password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <Form.Control.Feedback type="invalid" >
                                                Please provide a valid city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="Password" placeholder="Confirm Password" required value={Cpassword}
                                                onChange={(e) => setCpassword(e.target.value)} />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid state.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" onClick={handleClick}>Submit form</Button>
                                </Form>
                            </div>
                        </Container>
                    </div>
            
        </>
    );
}

export default NewProject;
