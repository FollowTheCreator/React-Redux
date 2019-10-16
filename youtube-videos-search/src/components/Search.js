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
            <div>
                <input onChange={this.handleChange} value={this.props.queryString} />
                <button onClick={this.handleSubmit}>
                    find
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