import React, { Component } from 'react';
import '../css/styles.css';

class Header extends Component {
    render() {
        return (
            <header className='jumbotron jumbotron-fluid'>
                <div className='container'>
                    <h3 className='display-4'>Employee Directory</h3>
                    <p className='lead'>Search for an employee and sort the employees by name.</p>
                </div>
            </header>
        );
    };
};

export default Header;
