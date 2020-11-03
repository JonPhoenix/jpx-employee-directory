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

    // Sort employees alphabetically by name
    sortAlpha = employees => {
        const sortType = this.state.sortType;

        if (sortType === 'desc' || sortType === '') {
            //Ascending order:
            employees.sort(this.dynamicSort('name'));
            this.setState({
                sortEmployees: employees,
                sortType: 'asc'
            });
        } else if (sortType === 'asc') {
            //Descending order:
            employees.sort(this.dynamicSort('-name'));
            this.setState({
                sortEmployees: employees,
                sortType: 'desc'
            });
        };
    };

    // Sort employees alphabetically reversed by name
    dynamicSort = property => {
        var sortOrder = 1;

        if(property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        };

        return function (a,b) {
            if (sortOrder === -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }        
        };
    };

    render() {
        let employeesList;

        if (this.state.sortEmployees.length > 0) {
            employeesList = this.state.sortEmployees;
        } else {
            employeesList = this.state.employees;
        };

        let sortArrow;
        const sortState = this.state.sortType;

        if (sortState === 'asc') {
            //down arrow
            sortArrow = <span>&#9660;</span>;
        } else if (sortState === 'desc') {
            //up arrow
            sortArrow = <span>&#9650;</span>;
        } else {
            sortArrow = '';
        };

        return (
            <>
                < Header />
                < Search 
                    filterByName={this.filterByName} 
                    query={this.state.query} 
                />
                < EmployeesTable 
                    employees={employeesList} 
                    sortAlpha={this.sortAlpha} 
                    sortArrow={sortArrow} 
                />
            </>
        );
    };
};

export default MainDirectory;