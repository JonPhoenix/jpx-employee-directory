import React, { Component } from 'react';
import '../css/styles.css';

class EmployeeData extends Component {
    formatDate = date => {
        const dateString = date.dob.toString();
        const yearEnd = dateString.indexOf('-');
        const year = dateString.substring(0, yearEnd);
        const monthEnd = dateString.indexOf('-', yearEnd + 1);
        let month = dateString.substring(yearEnd + 1, monthEnd);
        month = (month.substr(0, 1) === '0') ? month.substr(1) : month;
        let day = dateString.substr(monthEnd + 1, 2);
        day = (day.substr(0, 1) === '0') ? day.substr(1) : day;

        return `${month}-${day}-${year}`;
    };

    render() {
        const { order, image, name, phone, email, dob } = this.props;
        
        return (
            <tr>
                <td>{order}</td>
                <td><img src={image} alt={name} /></td>
                <td>{name}</td>
                <td>{phone}</td>
                <td><a href={`mailto:${email}`}>{email}</a></td>
                <td>{this.formatDate({dob})}</td>
            </tr>
        );
    };
};

export default EmployeeData;
