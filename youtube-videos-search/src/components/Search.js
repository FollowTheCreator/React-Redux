import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
    }

    handleChange(event){
        this.props.onSearchChange(event.target.value);
    }

    handleSubmit(){
        this.props.onSearchSubmit();
    }

    render(){
        return(
            <div className="jumbotron input-group">
                <input className="form-control" onChange={this.handleChange} value={this.props.queryString} placeholder="Search..." />
                <button className="input-group-append btn btn-secondary" onClick={this.handleSubmit}>
                    Search
                </button>
            </div>
        );
    }
}

Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    queryString: PropTypes.string
}

export default Search;