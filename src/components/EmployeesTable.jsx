import React, { Component } from 'react';
import EmployeeData from './EmployeeData';

class EmployeesTable extends Component {
    renderEmployee = (employeeData, index) => {
        let displayed;

        if (employeeData.display === undefined) {
            displayed = true;
        } else {
            displayed = employeeData.display;
        };

        if (displayed === true) {
            return (
                <EmployeeData 
                    key={index}
                    order={index + 1}
                    image={employeeData.image}
                    name={employeeData.name}
                    phone={employeeData.phone}
                    email={employeeData.email}
                    dob={employeeData.dob}
                />
            );
        };
    };

    render() {
        return (
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Image</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.employees.map((employeeData, index) => (
                            this.renderEmployee(employeeData, index)
                        ))
                    }
                </tbody>
            </table>
        );
    };
};

export default EmployeesTable;