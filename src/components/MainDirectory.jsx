import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';
import EmployeesTable from './EmployeesTable';
import API from '../utils/API';

class MainDirectory extends Component {
    state = {
        employees: [],
        query: '',
        sortEmployees: [],
        sortType: ''
    };

    componentDidMount() {
       this.loadEmployees();
    };

    loadEmployees() {
        API.getEmployees()
        .then(res => { 
            this.createEmployeesList(res.data.results);
        })
        .catch(err => console.log(err));
    };

    createEmployeesList = employees => {
        const newEmployeesList = employees.map((employee => {
            return (
                {
                    dob: employee.dob.date,
                    email: employee.email,
                    name: `${employee.name.first} ${employee.name.last}`,
                    phone: employee.phone,
                    image: employee.picture.large
                }
            )
        }));

        this.setState({
            employees: newEmployeesList
        });
    };

    //Filter by name
    filterByName = event => {
        const query = event.target.value;
        
        this.setState({query}, () => {
            let employeesList;

            if (this.state.sortEmployees.length > 0) {
                employeesList = this.state.sortEmployees;
            } else {
                employeesList = this.state.employees;
            };
           
            //True/false to display the matching record with the search:
            const newEmployeeTable = employeesList.map(employee => {
                let name = employee.name.toLowerCase();

                if (name.indexOf(this.state.query.toLowerCase()) !== -1) {
                    return {...employee, display: true}
                } else {
                    return {...employee, display: false}
                }
            });

            this.setState({
                employees: newEmployeeTable,
                sortEmployees: newEmployeeTable
            });
        });
    };

    render() {
        let employeesList;

        if (this.state.sortEmployees.length > 0) {
            employeesList = this.state.sortEmployees;
        } else {
            employeesList = this.state.employees;
        }

        return (
            <>
                < Header />
                < EmployeesTable employees={employeesList} />
            </>
        );
    };
};

export default MainDirectory;