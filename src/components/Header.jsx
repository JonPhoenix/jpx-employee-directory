import React, { Component } from 'react';
import '../css/styles.css';

class Header extends Component {
    render() {
        return (
            <header className='jumbotron jumbotron-fluid'>
                <div className='container'>
                    <h1 className='display-3'>Employee Directory</h1>
                    <p className='lead'>Search for an employee. Sort the employees by name.</p>
                </div>
            </header>
        );
    };
};

export default Header;
