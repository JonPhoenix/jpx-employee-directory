import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div>
                <form id='search-form' className='form-inline'>
                    <div className='form-group mb-2'>
                        <label htmlFor='Search' className='sr-only'>Search Employee</label>
                        <input 
                            type = 'text' 
                            className = 'form-control' 
                            id = 'search-query' 
                            onChange = {this.props.filterByName} 
                            placeholder = 'Search Employee' 
                        />
                    </div>
                </form>
            </div>
        );
    };
};

export default Search;
