import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function EmployeesForm() {

    const [getData, setgetData] = useState([]);

    useEffect(() => {
        getEmployeeData();
    }, [])
    const getEmployeeData = async () => {
        try {
            var res = await axios.get("https://employees-api-eight.vercel.app/getEmployeesDetails");
            setgetData(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <div className="table-responsive">
                <Table striped bordered hover className="custom-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Salary</th>
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
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default EmployeesForm;