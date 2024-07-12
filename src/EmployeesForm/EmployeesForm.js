import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'

function EmployeesForm() {

    const [getData, setgetData] = useState([]);
    const [firstName, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [salary, setsalry] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() => {
        getEmployeeData();
    }, []);

    const getEmployeeData = async () => {
        setloading(true)
        try {
            var res = await axios.get("https://employees-api-eight.vercel.app/getEmployeesDetails");
            if (res.status === 200) {
                setgetData(res.data);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }

    const handleSubmit = async () => {
        debugger
        if (firstName === "") {
            Swal.fire({
                title: "Oops!",
                text: "Please Enter First Name 😒",
                icon: "error"
            });
        } else if (lastname === "") {
            Swal.fire({
                title: "Oops!",
                text: "Please Enter Last Name 😒",
                icon: "error"
            });
        } else if (salary === "") {
            Swal.fire({
                title: "Oops!",
                text: "Please Enter Salry Name 😒",
                icon: "error"
            });
        } else {
            setloading(true);
            try {
                const data = {
                    Name: firstName,
                    LastName: lastname,
                    Salary: salary
                }
                var res = await axios.post("https://employees-api-eight.vercel.app/postEmployeesDetails", data);
                if (res.status === 200) {
                    setFirstname("");
                    setlastname("");
                    setsalry("");
                    Swal.fire({
                        title: "Congratulation",
                        text: "One Rceord Added Successfully 👍",
                        icon: "success"
                    });
                    getEmployeeData();
                }

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            setloading(true);
            var res = await axios.delete("https://employees-api-eight.vercel.app/deleteemployeesrecord/" + id);
            if (res.status === 200) {
                Swal.fire({
                    title: "Delete",
                    text: "One Rceord Deleted Successfully",
                    icon: "info"
                });
                getEmployeeData();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    return (
        <>
            {
                loading ? <Container id='loder-container'>
                    <div className="loader">
                    <span className="l">L</span>
                    <span className="o">o</span>
                    <span className="a">a</span>
                    <span className="d">d</span>
                    <span className="i">i</span>
                    <span className="n">n</span>
                    <span className="g">g</span>
                    <span className="d1">.</span>
                    <span className="d2">.</span>
                </div>
                </Container> :
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Form>
                                    <Form.Group md={6}>
                                        <Form.Label id='form-lable'>First Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='firstName'
                                            placeholder='Enter Your First Name'
                                            value={firstName}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        >
                                        </Form.Control>
                                        <br></br>
                                        <Form.Label id='form-lable'>Last Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='lastName'
                                            placeholder='Enter Your Last Name'
                                            value={lastname}
                                            onChange={(e) => setlastname(e.target.value)}
                                        >
                                        </Form.Control>
                                        <br></br>
                                        <Form.Label id='form-lable'>Salary</Form.Label>
                                        <Form.Control
                                            type='number'
                                            name='Salary'
                                            placeholder='Enter Your Salary Name'
                                            value={salary}
                                            onChange={(e) => setsalry(e.target.value)}
                                        >
                                        </Form.Control>
                                        <br></br>
                                        <Button onClick={handleSubmit}>Submit</Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                        <div className="table-responsive">
                            <Table striped bordered hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Salary</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getData.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.LastName}</td>
                                                <td>{item.Salary}</td>
                                                <td><Button variant='danger' onClick={() => handleDelete(item.id)}>Delete</Button></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Container>
            }
        </>
    )
}

export default EmployeesForm;